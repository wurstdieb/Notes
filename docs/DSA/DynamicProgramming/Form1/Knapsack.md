---
title: Knapsack
---

Given a set of items, each with a weight and a value, determine which items to include in the collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

**Solution:** Now obviously this problem can be solved using backtracking and checking over all 2^i subsets, but if time complexity permits, it can be more optimally done using DP.  
Note that for every element there is a choice as to take or not take it, so it can be solved using form 1. Now the DP definition can be defined as DP(i, W_left) -> maximum value taking the objects from [i...N] such that the total weight does not exceed W_left. The transition would be decided by choosing to either take or not take ith element, i.e. `DP(i,w) = max(DP(i+1, w-w[i])+v[i], DP(i+1, w))`.  
```cpp
//we're given two arrays w,v
const int inf;
int n = w.size();
int dp[1010][1010];
memset(dp,-1, sizeof(dp));

int rec(int i, int x){
    if(x < 0)return -inf;//prune here 
    if(i == n)return 0;
    if(dp[i][x]!= -1)return dp[i][x];
    int ans = rec(i+1, x);
    if(x >= w[i]){//or prune here
        ans = max(ans, rec(i+1, x-w[i]) + v[i]);
    }
    return dp[i][x] = ans;
}
```  
```cpp
int knapsack( vector<int> &w, vector<int> &v, int wmax){//given sum of all weights <= 1e5
    vector<int> dp(wmax+10, 0);
    dp[0] = 0;
    for(int i = 0 ; i < w.size();i++){
        for(int wprev = wmax; wprev >= w[i]; wprev--){
            dp[wprev] = max(dp[wprev], dp[wprev - w[i]]+v[i]);
        }
    }
    return dp[wmax];
}
```

## Follow-up questions  
1. Print a solution for the above question. 
1. How would the solution change if each item were available in an infinite quantity?
2. Assume maximum k items can be taken?
3. Assume that we enforce an additional condition that says that the sum of weights must be divisible by M?
4. What if two adjacent elements can't ever be taken?

**Solution 1:**  
```cpp
vector<int> items;
void generate(int i, int x){
    if(i == n)return;
    int nextValue = rec(i+1, x); // the value for not taking the ith item in O(1)
    if(x >= w[i]){
        int t = rec(i+1, x-w[i]) + v[i];
        if(nextValue > t){
            generate(i+1, x);
            return;
        }else{
            generate(i+1, x-w[i]);
            return;
        }
    }else{
        generate(i+1, x);
        return ;
    }
    /*** 
    We already have the dp values computed in the previous step,
    now we go to each node and see where its value is coming from,
    if its coming from taking it, add that node and go to the next step,
    else skip it
    ***/
}
```  
**Solution 2:**  
```cpp
const int inf = 1e9;
int n = v.size();
int dp[1010][1010];
memset(dp, -1, sizeof(dp));
int rec(int i ,int x){
    if(x < 0)return -inf;
    if(i == n)return 0;
    if(dp[i][x]!= -1)return dp[i][x];
    int ans = rec(i+1, x);
    int how_many = x/w[i];
    for(int t = 0; t <= how_many;t++){
        ans = max(ans, rec(i+1, x - t*w[i]) + t* v[i]);
    }
    /***
    When at the ith node, our node gets its values from 1 + t nodes from i+1,
    so we'll have to check for all of them, giving us a TC -> O(N*W*(1+t_max));
    t_max can be as large as N. 
    ***/
    return dp[i][x] = ans;
}
```  
Another way to do the same but with a lesser time complexity would be:
```cpp
const int inf = 1e9;
int n = v.size();
int dp[1010][1010];
memset(dp, -1, sizeof(dp));
int rec(int i ,int x){
    if(x < 0)return -inf;
    if(i == n)return 0;
    if(dp[i][x]!= -1)return dp[i][x];
    int ans = rec(i+1, x);
    if(x>= w[i]){
        ans = max(ans, rec(i, x-w[i])+v[i]);
    }

    /***
    When at the ith node, we can take the ith node again or
    we can skip it, so this time our TC would be O(N*M(1+2)), 
    which would be relatively lower that the previous approach 
    ***/
    return dp[i][x] = ans;
}
```  
**Solution 3:**  
Addition of a new constraint in the problem, adds another state variable in our DP state tracking:  
```cpp
const int inf = 1e9;
int n = v.size();
int dp[110][110][110];
memset(dp, -1, sizeof(dp));
int rec(int i, int x, int items){//items-> items limit left
    if(x < 0 || items  < 0)return -inf;
    if(i==n)return 0;
    if(dp[i][x][items]!=-1) return dp[i][x][items];
    ans = rec(i+1, x, items);
    if(x >= w[i] && items >= 0){
        ans = max(ans, rec(i+1, x-w[i], items-1) + v[i]);
    }
    return dp[i][x][items] = ans;
}
```
**Solution 4:** Skipped Intentially, figure it out by yourself.  
**Solution 5:**  
You can either track the last element taken and add it as a new state variable, or you can do it as follows:  
```cpp
const int inf = 1e9;
int n = w.size();
int dp[1010][1010];
memset(dp,-1, sizeof(dp));

int rec(int i, int x){
    if(x < 0)return -inf;//prune here 
    if(i == n)return 0;
    if(dp[i][x]!= -1)return dp[i][x];
    int ans = rec(i+1, x);
    if(x >= w[i]){//or prune here
        ans = max(ans, rec(i+2, x-w[i]) + v[i]); 
    }
    /***
    if its being taken then go to the next available node,i.e. i+2,
    this way we won't have to save the last taken node as a new state variable
    ***/
    return dp[i][x] = ans;
}
```


