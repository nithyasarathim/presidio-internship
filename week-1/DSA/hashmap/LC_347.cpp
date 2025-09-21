//https://leetcode.com/submissions/detail/1777933747/

class Solution {
    public:
        vector<int> topKFrequent(vector<int>& arr, int k) {
            map<int,int> mp;
            for(int i: arr){
                mp[i]++;
            }
            priority_queue<pair<int,int>> pq;
            for(auto i: mp){
                pq.push({i.second,i.first});
            }
            vector<int> r;
            while(k-- && !pq.empty()){
                r.push_back(pq.top().second);
                pq.pop();
            }
            return r;
        }
    };