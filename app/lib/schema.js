import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, {message: "Message is required"}),
  type: z.enum(["SAVING", "CURRENT", "Trout"]),
  balance: z.string().min(1, {message: "Balance is required"}),
  isDefault: z.boolean().default(false)

});
