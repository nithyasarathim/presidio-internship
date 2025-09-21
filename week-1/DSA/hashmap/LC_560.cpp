//https://leetcode.com/submissions/detail/1777942422/

//SUBARRAY SUM EQUALS K

class Solution {
    public:
        int subarraySum(vector<int>& arr, int k) {
            map<int,int> mp;
            int cnt=0;
            int cSum=0;
            for(int i=0;i<arr.size();i++){
                cSum+=arr[i];
                if(cSum==k) cnt++;
                cnt+=mp[cSum-k];
                mp[cSum]++;
            }
            return cnt;       
        }
    };