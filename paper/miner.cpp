double CFunctionSimulate::CurveSimulate(double n[],double T[],int M,int N,int xi)
//参数说明//
//n[] 自变量数据数组
//T[] 因变量数据数组
//M 拟和公式的最高阶数
//N 数据组数
//xi 所返回系数值的对应参数
{
double b[10][20];
double A[10][10],B[10],t,x[10],y[10];
int i,j,k,l;
for(i=0;i<M;i++)
  for(j=0;j<N;j++)
  {
    t=1;
    for(l=0;l<i;l++)
    {t=t*n[j];}
    b[i][j]=t;

  }

for(i=0;i<M;i++)
for(k=0;k<M;k++)
{
t=0;
for(j=0;j<N;j++)
t+=b[i][j]*b[k][j];
A[i][k]=t;
}

for(i=0;i<M;i++)
{
t=0;
for(j=0;j<N;j++)
t+=T[j]*b[i][j];
B[i]=t;
}


for(i=1;i<M;i++)
A[i][0]=A[i][0]/A[0][0];

for(i=1;i<M;i++)
for(j=i;j<M;j++)
{
t=0;
for(k=0;k<i;k++)
t+=A[k][j]*A[i][k];
A[i][j]=A[i][j]-t;
if(j+1!=M)
{
t=0;
for(k=0;k<i;k++)
t+=A[k][i]*A[j+1][k];
A[j+1][i]=(A[j+1][i]-t)/A[i][i];
}	

}



y[0]=B[0];
for(i=1;i<M;i++)
{
t=0;
for(j=0;j<i;j++)
t+=A[i][j]*y[j];
y[i]=B[i]-t;	

}

x[M-1]=y[M-1]/A[M-1][M-1];
for(i=M-2;i>=0;i--)
{
t=0;
for(j=i+1;j<M;j++)
t+=A[i][j]*x[j];
x[i]=(y[i]-t)/A[i][i];	
}

return x[xi];
}

//因为我所在的项目要用到最小二乘法拟合，所有我抽时间将C++实现的程序改为JAVA实现，现在贴出来，供大家参考使用。
/**
 * <p>函数功能：最小二乘法曲线拟合</p>
 * @param x 实型一维数组，长度为 n 。存放给定 n 个数据点的　X　坐标
 * @param y 实型一维数组，长度为 n 。存放给定 n 个数据点的　Y　坐标
 * @param n 变量。给定数据点的个数
 * @param a 实型一维数组，长度为 m 。返回 m-1　次拟合多项式的 m 个系数
 * @param m 拟合多项式的项数，即拟合多项式的最高次数为 m-1.
 *          要求 m<=n 且m<=20。若 m>n 或 m>20 ，则本函数自动按 m=min{n,20} 处理.
 * <p>Date:2007-12-25 16:21 PM</p>
 * @author qingbao-gao
 * @return 
 */
 public static double[] PolyFit(double x[], double y[], int n, double a[], int m)
 {
  int i, j, k;
  double z, p, c, g, q = 0, d1, d2; 
  double []s=new double[20];
  double []t=new double[20];
  double[] b=new double[20];
  double[]dt=new double[3];
  for (i = 0; i <= m-1; i++)
  {
   a[i] = 0.0;
  }
  if (m > n)
  {
   m = n;
  }
  if (m > 20)
  {
   m = 20;
  }
  z = 0.0;
  for (i = 0; i <= n-1; i++)
  {
   z = z+x[i]/(1.0 *n);
  }
  b[0] = 1.0;
  d1 = 1.0 * n;
  p = 0.0;
  c = 0.0;
  for (i = 0; i <= n-1; i++)
  {
   p = p+(x[i]-z);
   c = c+y[i];
  }
  c = c/d1;
  p = p/d1;
  a[0] = c * b[0];
  if (m > 1)
  {
   t[1] = 1.0;
   t[0] = -p;
   d2 = 0.0;
   c = 0.0;
   g = 0.0;
   for (i = 0; i <= n-1; i++)
   {
    q = x[i]-z-p;
    d2 = d2+q * q;
    c = c+y[i] *q;
    g = g+(x[i]-z) *q * q;
   }
   c = c/d2;
   p = g/d2;
   q = d2/d1;
   d1 = d2;
   a[1] = c * t[1];
   a[0] = c * t[0]+a[0];
  }
  for (j = 2; j <= m-1; j++)
  {
   s[j] = t[j-1];
   s[j-1] = -p * t[j-1]+t[j-2];
   if (j >= 3)
    for (k = j-2; k >= 1; k--)
       {
     s[k] = -p * t[k]+t[k-1]-q * b[k];
       }
   s[0] = -p * t[0]-q * b[0];
   d2 = 0.0;
   c = 0.0;
   g = 0.0;
   for (i = 0; i <= n-1; i++)
   {
    q = s[j];
    for (k = j-1; k >= 0; k--)
    {
     q = q *(x[i]-z)+s[k];
    }
    d2 = d2+q * q;
    c = c+y[i] *q;
    g = g+(x[i]-z) *q * q;
   }
   c = c/d2;
   p = g/d2;
   q = d2/d1;
   d1 = d2;
   a[j] = c * s[j];
   t[j] = s[j];
   for (k = j-1; k >= 0; k--)
   {
    a[k] = c * s[k]+a[k];
    b[k] = t[k];
    t[k] = s[k];
   }
  }
  dt[0] = 0.0;
  dt[1] = 0.0;
  dt[2] = 0.0;
  for (i = 0; i <= n-1; i++)
  {
   q = a[m-1];
   for (k = m-2; k >= 0; k--)
   {
    q = a[k]+q *(x[i]-z);
   }
   p = q-y[i];
   if (Math.abs(p) > dt[2])
   {
    dt[2] = Math.abs(p);
   }
   dt[0] = dt[0]+p * p;
   dt[1] = dt[1]+Math.abs(p);
  }
  return a;
 }
 
 #include <stdio.h>

#include <stdlib.h>

#include <malloc.h>

#include <math.h>



Smooth(double *,double *,double *,int,int,

   double *,double *,double *);

void main()

{

int i,n,m;

double *x,*y,*a,dt1,dt2,dt3,b;

n = 20;

m = 6;

b = 0;

/*分别为x,y,a分配存贮空间*/

x = (double *)calloc(n,sizeof(double));

if(x == NULL)

{

printf("内存分配失败\n");

exit (0);

}

y = (double *)calloc(n,sizeof(double));

if(y == NULL)

{

printf("内存分配失败\n");

exit (0);

}

a = (double *)calloc(n,sizeof(double));

if(a == NULL)

{

printf("内存分配失败\n");

exit (0);

}

for(i=1;i<=n;i++)

{

x[i-1]=b+(i-1)*0.1;

/*每隔0.1取一个点，这样连续取n个点*/

y[i-1]=x[i-1]-exp(-x[i-1]);

//y[i-1] = x[i-1]*x[i-1]*x[i-1];

//y[i-1]   =	 x[i-1]	;
/*计算x[i-1]点对应的y值作为拟合已知值*/

}

Smooth(x,y,a,n,m,&dt1,&dt2,&dt3);                    /*调用拟合函数*/

for(i=1;i<=m;i++)

printf("a[%d] = %.10f\n",(i-1),a[i-1]);

printf("拟合多项式与数据点偏差的平方和为：\n");

printf("%.10e\n",dt1);

printf("拟合多项式与数据点偏差的绝对值之和为：\n");

printf("%.10e\n",dt2);

printf("拟合多项式与数据点偏差的绝对值最大值为：\n");

printf("%.10e\n",dt3);

free(x);                                                                       /*释放存储空间*/

free(y);                                                                       /*释放存储空间*/

free(a);                                                                       /*释放存储空间*/

}



Smooth(double *x,double *y,double *a,int n,int m,double *dt1,double *dt2,double *dt3 )
//
//double *x;                                /*实型一维数组，输入参数，存放节点的xi值*/
//
//double *y;                               /*实型一维数组，输入参数，存放节点的yi值*/
//
//double *a;                               /*双精度实型一维数组，长度为m。返回m一1次拟合多项式的m个系数*/
//
//int n;                                               /*整型变量，输入参数，给定数据点的个数*/
//
//int m;                                               /*整型变量，输入参数，拟合多项式的项数*/
//
//double *dt1;                            /*实型变量，输出参数，拟合多项式与数据点偏差的平方和*/
//
//double *dt2;                            /*实型变量，输出参数，拟合多项式与数据点偏差的绝对值之和*/
//
//double *dt3;                            /*实型变量，输出参数，拟合多项式与数据点偏差的绝对值最大值*/

{

int i,j,k;

double *s,*t,*b,z,d1,p,c,d2,g,q,dt;

/*分别为s,t,b分配存贮空间*/

s = (double *)calloc(n,sizeof(double));

if(s == NULL)

{

printf("内存分配失败\n");

exit (0);

}

t = (double *)calloc(n,sizeof(double));

if(t == NULL)

{

printf("内存分配失败\n");

exit (0);

}

b = (double *)calloc(n,sizeof(double));

if(b == NULL)

{

printf("内存分配失败\n");

exit (0);

}

z = 0;

for(i=1;i<=n;i++)

z=z+x[i-1]/n;                            /*z为各个x的平均值*/

b[0]=1;

d1=n;

p=0;

c=0;

for(i=1;i<=n;i++)

{

p=p+x[i-1]-z;

c=c+y[i-1];

}

c=c/d1;

p=p/d1;

a[0]=c*b[0];

if(m>1)

{

t[1]=1;

t[0]=-p;

d2=0;

c=0;

g=0;

for(i=1;i<=n;i++)

{

q=x[i-1]-z-p;

d2=d2+q*q;

c=y[i-1]*q+c;

g=(x[i-1]-z)*q*q+g;

}

c=c/d2;

p=g/d2;

q=d2/d1;

d1=d2;

a[1]=c*t[1];

a[0]=c*t[0]+a[0];

}

for(j=3;j<=m;j++)

{

s[j-1]=t[j-2];

s[j-2]=-p*t[j-2]+t[j-3];

if(j>=4)

for(k=j-2;k>=2;k--)

s[k-1]=-p*t[k-1]+t[k-2]-q*b[k-1];

s[0]=-p*t[0]-q*b[0];

d2=0;

c=0;

g=0;

for(i=1;i<=n;i++)

{

q=s[j-1];

for(k=j-1;k>=1;k--)

q=q*(x[i-1]-z)+s[k-1];

d2=d2+q*q;

c=y[i-1]*q+c;

g=(x[i-1]-z)*q*q+g;

}

c=c/d2;

p=g/d2;

q=d2/d1;

d1=d2;

a[j-1]=c*s[j-1];

t[j-1]=s[j-1];

for(k=j-1;k>=1;k--)

{

a[k-1]=c*s[k-1]+a[k-1];

b[k-1]=t[k-1];

t[k-1]=s[k-1];

}

}

*dt1=0;

*dt2=0;

*dt3=0;

for(i=1;i<=n;i++)

{

q=a[m-1];

for(k=m-1;k>=1;k--)

q=q*(x[i-1]-z)+a[k-1];

dt=q-y[i-1];

if(fabs(dt)>*dt3)

*dt3=fabs(dt);

*dt1=*dt1+dt*dt;

*dt2=*dt2+fabs(dt);

}

/*释放存储空间*/

free(s);

free(t);

free(b);

return(1);

}