const asyncHandler = (func) => {
    return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
}}

// Promise.resolve() WILL ALWAYS RETURN A PROMISE: 
// * If you return a Promise -> stays a Promise
// * If you return a value -> becomes a resolved Promise
// * If you throw an error -> becomes a rejected Promise

export{asyncHandler}