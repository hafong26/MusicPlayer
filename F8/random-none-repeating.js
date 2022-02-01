function ranNums(start, end) {
    var nums = [],
        ranNums = [],
        numLength = end,
        j = 0;
    for (i = start; i <= end; i++) {
        nums[i] = i;
    }
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
    }
    return ranNums;
}