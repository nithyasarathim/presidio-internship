// https://leetcode.com/submissions/detail/1777963754/

// FIBONACCI SERIES

class Solution {
    public:
        int fib(int n) {
            if(n<=1) return n;
            return fib(n-1)+fib(n-2);
        }
    };