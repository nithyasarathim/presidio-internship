//https://leetcode.com/submissions/detail/1777925376/

//LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS

class Solution {
    public:
        int lengthOfLongestSubstring(string s) {
            int ans=0;
            map<char,int> mp;
            int l=0;
            int r=0;
            int n=s.length();
            while(r<n){
                mp[s[r]]++;
                while(mp[s[r]]>1 && l<r){
                    mp[s[l]]--;
                    l++;
                }
                ans=max(ans,r-l+1);
                r++;
            }
            return ans;
        }
    };
