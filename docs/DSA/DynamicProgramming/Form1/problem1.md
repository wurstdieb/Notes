---
title: Iterative Techniques
---



## Partition Equal Sum Subset [Link](https://leetcode.com/problems/partition-equal-subset-sum/description/?envType=problem-list-v2&envId=doockqu1)  
Now this very question can either be solved recursively or iteratively just like any other dp question. The recursive strategy is pretty simple i.e. tracking the amount left to be accounted for apart from the index of the array.  
```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size();
        int sum = 0;
        for(int num: nums){
            sum+= num;
        }if(sum&1)return false;
        sum/=2;
        int dp[220][10010];
        
        function<int(int,int)> rec = [&](int i, int left){
            if(left < 0)return 0;
            if(i == n){
                if(!left)return 1;
                return 0;
            }
            if(dp[i][left]!= -1)return dp[i][left];
            bool ans = rec(i+1, left) || rec(i+1, -nums[i]+left);
            return dp[i][left] = ans;
        };

        memset(dp, -1, sizeof(dp));
        return rec(0,sum);
    }
};
```  
This can be further optimized by doing the same in a better optimized iterative method as follows:  
```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size();
        int sum = 0;
        for(int num: nums){
            sum+= num;
        }if(sum&1)return false;
        sum/=2;
        vector<bool>dp(sum+1, false);
        dp[0] = true;// a subset of sum 0 is always possible

        for(int num : nums){
            for(int s = sum; s>= num;s--){
                dp[s] = dp[s]||dp[s-num]; 
            }if(dp[sum])break;
        }
        /***
        Say right now dp[0] is true,
        consider the case S = {1,2,3,5,7}, so we need a sum of 9
        dp[9] = 0, dp[8] = 0, dp[7] = 0, dp[6] = 0, dp[5] = 0, dp[4] = 0, dp[3] = 0, dp[2] = 0, dp[1] = 1,
        dp[9] = 0, dp[8] = 0, dp[7] = 0, dp[6] = 0, dp[5] = 0, dp[4] = 0, dp[3] = 1, dp[2] = 1, dp[1] = 1,
        dp[9] = 0, dp[8] = 0, dp[7] = 0, dp[6] = 1, dp[5] = 1, dp[4] = 1, dp[3] = 1, dp[2] = 1, dp[1] = 1,
        dp[9] = 1, dp[8] = 1, dp[7] = 1, dp[6] = 1, dp[5] = 1, dp[4] = 1, dp[3] = 1, dp[2] = 1, dp[1] = 1,
        ... can break here as value sats the same here on, we can see how the value propagates from dp[0] 
        to dp[9].
        ***/

    }
};  
```

## Coin Change [Link](https://leetcode.com/problems/coin-change/description/?envType=problem-list-v2&envId=doockqu1)  
```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int dp[10010];
        memset(dp, 0x3f,sizeof(dp));

        dp[0] = 0;//0 coins needed to get a sum of 0
        for(int ssum = 0; sum <= amount ;sum++){
            for(int coin: coins){
                if(sum>= coin){
                    dp[sum] = min(dp[sum], 1 + dp[sum-coin]);
                }
            }
        }
        return (dp[amount]==0x3f3f3f3f)?-1:dp[amount];
        /*** 
        Think how does taking a coin of value "coin" help our case. Say there is a value bw p that maybe
        benefits from taking the "coin" then it has to be that dp[p-coin], or at least dp[p] should be some
        value but 0x3f, in that case, the dp[p] with the help of "coin" either stays the same or gets updated.
        Check similary for all possible values of p. 
        
        Note of Caution: Forward iteration in the question here works for both bounded and unbounded number of coins. 
        Backward iteration only lets you take a single coin.
        ***/

    }
};  
```  
