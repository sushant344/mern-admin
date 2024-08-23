const { z } = require("zod");

// zod validation to handle inputs validation --
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be atleast 6 characters" })
    .max(50, { message: "Email must be atleast 50 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(30, { message: "Password must be atleast 30 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(20, { message: "Name must be atleast 20 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 characters" })
    .max(20, { message: "Phone must be atleast 20 characters" }),

});



module.exports = {
  signupSchema,
  loginSchema,
};
