---
title: Dynamic Programming
---

Dynamic Programming essentially is an optimization method used to convert a recursion tree into a Directed Acyclic Graph, thus reducing the recomputation overhead for same nodes. For example the code
for fibonacci sequences can be recursively written as follows:
```cpp
int fib(int x){
    if(x<=1)return x;//base case
    return fib(x-1) + fib(x-2);//recursive case
}
```
Now this piece of code above recomputes the same node multiple times which is not the most optimal way as the complexity becomes exponential too fast. Instead, caching the node's value the first time it is computed helps reduce the overhead. This can be done very simply by adding a few lines to the existing code, as shown below:

```cpp
int dp[1010];//Assume 0 <= n <= 1000;
memset(dp, -1, sizeof(dp));
int fib(int x){
    if(x<= 1)return x;//base case
    if(dp[x]!= -1)return dp[x];//cache check
    int ans = fib(x-1) + fib(x-2);//calculate
    return dp[x] = ans;//save and return
}
```

The above procedure of optimization is called the Top-Down recursive method. "Top Down" here signifies that the problem is broken down into smaller pieces till the base case is hit, and the answer is cached and the answer propagates towards the original problem, solving all the subproblems on its way back, and finally the original larger problem.  
Alternatively the same optimization can also be achieved by caching values from the base case and propagating towards the larger case without traversing once forward and again backward. This approach is called the "Bottom-Up" iterative method, and is shown below:
```cpp
int n;//find fib(n)
int dp[1010];
for(int i = 0; i <= n;i++){
    if(i<=1)dp[i]=i;
    else dp[i] = dp[i-1] + dp[i-2];
}
```
A DP code usually has these following parts to it:

- Pruning
- Base Case
- Cache check
- Calculate
- Save the calculated value

## DP Framework
1. Recognize the form to be used based on the setup of the problem and the contraints involved.
2. Figure out the possible definition of the recurrence that can solve the problem.
3. Decide transitions based on the definition made.
4. Check time complexity of the proposed approach i.e. `#S(1 + Avg #T)`, where S is the number of states, and T is the number of transitions.
5. Code the approach


## Example
Given a subset **S** = {1, 2, 3, 4, 5} and **X** = 5, (`N <= 1e3, X <= 1e3`)
1. Find the number of ways to make a subset with sum **X**.  
1. Find the minimum size of a subset with sum = **X**.  

Solving the first bit:   
Using the DP framework:  
1. Form 1
2. DP(i,left) -> Number of ways to make a subset of sum "left" from S[i...N]
3. DP(i, left) -> DP(i+1, left) + DP(i+1, left - S[i]), don't take and take respectively
4. 4. `#S(1 + Avg #T)` `<= 5 * 1e7`
5. Code:
```cpp
int n = s.size();
int dp[1010][1010];
memset(dp, -1, sizeof(dp));
int rec(int i, int left){
    if(left < 0)return 0;//prune

    if(i == n){//base
        if(left == 0)return 1;
        return 0;
    }

    if(dp[i][left]!= -1)return dp[i][left];//cache check

    int ans = rec(i+1, left) + rec(i+1, left-s[i]);//calculate

    return dp[i][left] = ans;//save and return
}  
```  
Solving the same but iteratively:  
```cpp
int dp[1010][1010];
memset(dp, 0, sizeof(dp));
int n = s.size();
dp[n][0] = 1;
for(int i = n-1; i>= 0;i--){
    for(int left = sum; left >= 0;left--){
        dp[i][left] = dp[i+1][left];
        if(left >= s[i]){
            dp[i][left] += dp[i+1][left - s[i]];
        }
    }
}
int ans = dp[0][sum];
```  
The second bit too can be solved similarly, but with a slight change of transitions:  
```cpp
const int inf = 1e9;
int n = s.size();
int dp[1010][1010];
memset(dp, -1, sizeof(dp));
int rec(int i, int left){
    if(left < 0)return inf;
    if(i == n){
        if(left == 0)return 0;
        return inf;
    }
    if(dp[i][left]!= -1)return dp[i][left];
    int ans = min(rec(i+1, left), rec(i+1, left-s[i]));
    return dp[i][left] = ans;
}
```  
Iterative solution :  
```cpp
int dp[1010][1010];
memset(dp, 0x3f, sizeof(dp));
int n = s.size();
dp[n][0] = 0;
for(int i = n-1; i>= 0;i--){
    for(int left = sum; left >= 0;left--){
        dp[i][left] = dp[i+1][left];
        if(left >= s[i]){
            dp[i][left] = min(dp[i+1][left], 1+dp[i+1][left-s[i]]);
        }
    }
}
int ans = dp[0][sum];
```

