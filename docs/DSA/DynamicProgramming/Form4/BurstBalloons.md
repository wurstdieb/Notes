---
title: Burst Balloons
---
You are given n balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.

If you burst the ith balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.  
**Solution:**  
Now say that we care about the maximum coins we can get on bursting balloons [l...r], which would be DP(l,r), now say that a balloon mid was the last balloon burst in this array, the coins we'd get would be` nums[l-1] * nums[mid] * nums[r+1] + DP(l,mid-1) + DP(mid+1,r)`, assuming l-1 and r+1 are within array boounds, so this would mean to maximize DP(l,r), we need to find the best mid that maximizes the number of coins.  
```cpp
class Solution {
public:
    vector <int> v;
    int n ;
    int dp[305][305];

    int rec(int left, int right){
        if(right < left)return 0;
        if(dp[left][right]!= -1)return dp[left][right];
        int ans = 0;
        for(int mid = left; mid <= right;mid++){
            int _t = v[mid];
            if(left-1>= 0) {
                _t*= v[left-1];
            }
            if(right+1 < n){
                _t*= v[right+1];
            }
            ans = max(ans, _t + rec(left, mid-1) + rec(mid+1, right));
        }
        return dp[left][right] = ans;
    }

    int maxCoins(vector<int>& nums) {
        v = nums;
        n = nums.size();
        memset(dp, -1, sizeof(dp));
        return rec(0, n-1);
    }
};
``` 