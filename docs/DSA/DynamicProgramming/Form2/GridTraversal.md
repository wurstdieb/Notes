---
title: Grid Traversal
---

Given a NxM grid, with walls denoted by '#', find the number of possible ways to travel from (0,0) to (N-1, M-1). If this were a shortest path finding problem, bfs could have easily solved it using the least time, however here we're asked to count the paths. Assume that the only possible moves are down, and right.  
![alt text](image-1.png)  
  
**Solution:** The DP state can be defined as, DP(i,j) = number of paths starting at (0,0) and ending at (i,j). The only paths that can converge at (i,j) are from (i-1,j) and (i,j-1) if they exist. This gives us the state transition, i.e. DP(i,j) = DP(i-1,j) + DP(i, j-1), if they exist and if they're not walls.  TC is O(N*M).  
```cpp
int n,m;
cin >> n;
vector<string>arr;
arr.resize(n);
for(int i = 0; i < n;i++)cin >> arr[i];//take inputs
m = arr[0].size(); 

int dp[1010][1010];
memset(dp, 0, sizeof(dp));

for(int i = 0; i < n;i++){
    for(int j = 0; j <m;j++){
        if(i == 0 && j ==0){
            dp[i][j] = (arr[0][0] == '#') ? 0 : 1;
        }
        else if(arr[i][j] == '#'){
            dp[i][j] = 0;
        }else{
            dp[i][j] = ((i-1)>=0 ?dp[i-1][j]:0) + ((j-1)>=0?dp[i][j-1]:0);
        }
    }
}

int ans = dp[n-1][m-1];
```  
Recursively:  
```cpp
int rec(int i, int j){
    if(arr[i][j] == '#')return 0;
    if(i == 0 && j == 0){
        return ((arr[0][0] == '#') ? 0 : 1);
    }
    int ans = 0;
    if(i-1>= 0){
        ans += rec(i-1,j);
    }
    if(j-1>= 0){
        ans += rec(i,j-1);
    }
    return dp[i][j] = ans;
}
```  
## Follow-up Questions: 
1. Assume that you're given a grid of values assigned to each cell in the array, assuming you still start at (0,0) and end at (n-1,m-1), give the maximum sum of values you can obtain on your traversal.  
2. Given a grid of 1s and 0s fine the area of the maximum square containing only 1s.

**Solution 1:** `DP(i,j) `= Max value accumumlated (0,0) through (i,j). Transition would be `DP(i,j) = max(v[i-1][j] + DP(i-1,j), v[i][j-1]+DP(i,j-1))` if the cells exist.  
```cpp
int n,m; //assume n,m have been initialized and set
int val[1010][1010];//assume values have been filled
int dp[1010][1010];
memset(dp, 0,sizeof(dp));

for(int i = 0; i < n;i++){
    for(int j = 0; j < m;j++){
        if(i==0 && j == 0){
            dp[i][j] = val[i][j];
        }else{
            dp[i][j] = max((i-1)>=0?dp[i-1][j]:0, (j-1)>=0?dp[i][j-1]:0);
        }
    }
}
int ans = dp[n-1][m-1];
```  
**Solution 2:** `DP(i,j)` = length of the maximum square grid ending at `(i,j)`. Transition: `DP(i,j) = min(DP(i-1,j-1), DP(i-1,j), DP(i,j-1)) + 1` if all three neighbors exist and are non-zero.
```cpp
int n,m;
int arr[1010][1010];
int dp[1010][1010];
memset(dp, 0, sizeof(dp));
int ans = 0;
for(int i = 0; i < n;i++){
    for(int j = 0; j < m;j++){
        if(arr[i][j] == 0) continue;
        if(i == 0 || j == 0){
            dp[i][j] = 1;
        }else{
            dp[i][j] = min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]}) + 1;
        }
        ans = max(dp[i][j], ans);
    }
}
```  
**Note on Form Classification:** This problem is classified under Form 2 as the subproblem is defined as the optimal solution ending at `(i,j)`, building up towards `(n-1,m-1)`. However grid problems in general sit on the boundary between Form 2 and Form 3. The key distinction is — Form 3 involves two truly independent sequences where both indices carry meaningful separate information (like two strings in LCS), whereas here `i` and `j` together just describe a position in a single forward traversal (only down/right moves). Since both indices are forced in one direction and the grid is essentially a single path-finding structure, it leans Form 2. That said, the same problem could be reframed as Form 3 depending on how you define your subproblem — what matters more is that you recognize the transition pattern and arrive at the correct recurrence.