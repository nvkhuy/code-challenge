// 1. Iterative Loop
// Time Complexity: O(n)
// Space Complexity: O(1)
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// 2. Mathematical Formula
// Time Complexity: O(1)  (constant time)
// Space Complexity: O(1)
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

// 3. Recursive Approach
// Time Complexity: O(n)
// Space Complexity: O(n) due to call stack
function sum_to_n_c(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
}

console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15
