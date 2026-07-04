// Mock API service simulating the LangGraph Battle AI Arena backend
// Replace this with actual API calls to your backend

const MOCK_RESPONSES = [
  {
    messages: [{ content: 'Write a factorial code in JS.' }],
    solution_1: `Here's a JavaScript function to calculate the factorial of a number:

### Iterative Approach:
\`\`\`javascript
function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Example usage:
console.log(factorial(5)); // Output: 120
\`\`\`

### Recursive Approach:
\`\`\`javascript
function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // Output: 120
\`\`\`

### Notes:
1. **Base Case**: Both approaches handle \`n = 0\` or \`n = 1\`.
2. **Error Handling**: The function throws an error for negative inputs.
3. **Performance**: The iterative approach is more efficient for large numbers.`,
    solution_2: `Here's a simple factorial function implemented in JavaScript:

\`\`\`javascript
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

// Example usage:
const number = 5;
const factorialResult = factorial(number);
console.log(\`The factorial of \${number} is \${factorialResult}\`);
\`\`\`

This code defines a \`factorial\` function that takes an integer \`n\` as input and returns its factorial. It handles the base cases of 0 and 1 directly and then uses a loop to calculate the factorial for other positive integers.`,
    judge_recommendation: { solution_1_score: 10, solution_2_score: 7 },
  },
  {
    messages: [{ content: 'Write a binary search implementation in Python.' }],
    solution_1: `### Binary Search - Recursive Approach

\`\`\`python
def binary_search(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1  # Target not found
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, right)
    else:
        return binary_search(arr, target, left, mid - 1)

# Example usage
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))  # Output: 3
\`\`\`

**Time Complexity:** O(log n) | **Space Complexity:** O(log n) due to recursion stack`,
    solution_2: `### Binary Search - Iterative Approach

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Target not found

# Example usage
arr = [1, 3, 5, 7, 9, 11, 13]
result = binary_search(arr, 7)
print(f"Found at index: {result}")  # Output: Found at index: 3
\`\`\`

**Time Complexity:** O(log n) | **Space Complexity:** O(1)`,
    judge_recommendation: { solution_1_score: 8, solution_2_score: 9 },
  },
];

let responseIndex = 0;

export async function sendMessage(userMessage) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));

  // Cycle through mock responses
  const response = MOCK_RESPONSES[responseIndex % MOCK_RESPONSES.length];
  responseIndex++;

  return {
    solution_1: response.solution_1,
    solution_2: response.solution_2,
    judge_recommendation: response.judge_recommendation,
  };
}
