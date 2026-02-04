// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// "use client";

// import { useState, useEffect } from "react";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { auth } from "../../../firebase";

// export default function SignupForm() {
//   const router = useRouter();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [dob, setDob] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isPhoneValid, setIsPhoneValid] = useState(true);
//   const [passwordStrength, setPasswordStrength] = useState("");

//   const [
//     createUserWithEmailAndPassword,
//     user,
//     loading,
//     error
//   ] = useCreateUserWithEmailAndPassword(auth);

//   // Phone validation
//   const handlePhoneChange = (e) => {
//     const value = e.target.value;
//     setPhone(value);

//     const phoneRegex = /^\+?\d{7,15}$/;
//     setIsPhoneValid(phoneRegex.test(value));
//   };

//   // Password strength checker
//   useEffect(() => {
//     if (!password) {
//       setPasswordStrength("");
//       return;
//     }

//     if (password.length < 6) {
//       setPasswordStrength("Weak");
//     } else if (password.length < 10) {
//       setPasswordStrength("Medium");
//     } else {
//       // Check for letters, numbers, symbols
//       const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
//       if (strongRegex.test(password)) {
//         setPasswordStrength("Strong");
//       } else {
//         setPasswordStrength("Medium");
//       }
//     }
//   }, [password]);

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match!");
//       return;
//     }

//     if (!isPhoneValid) {
//       setErrorMessage("Please enter a valid phone number!");
//       return;
//     }

//     try {
//       const res = await createUserWithEmailAndPassword(email, password);
//       if (!res) return;

//       // Clear form
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setPhone("");
//       setDob("");
//       setErrorMessage("");

//       alert("Account created successfully!");

//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//     } catch (e) {
//       console.error("Signup Error:", e);
//       setErrorMessage("Failed to create account. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Card className="py-10">
//         <CardHeader>
//           <CardTitle>Create an account</CardTitle>
//           <CardDescription>
//             Enter your information below to create your account
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form>
//             <FieldGroup className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* First Name */}
//               <Field>
//                 <FieldLabel htmlFor="firstName">First Name</FieldLabel>
//                 <Input
//                   id="firstName"
//                   type="text"
//                   placeholder="John"
//                   required
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </Field>

//               {/* Last Name */}
//               <Field>
//                 <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
//                 <Input
//                   id="lastName"
//                   type="text"
//                   placeholder="Doe"
//                   required
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </Field>

//               {/* Phone Number */}
//               <Field>
//                 <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
//                 <Input
//                   id="phone"
//                   type="tel"
//                   placeholder="+1234567890"
//                   required
//                   value={phone}
//                   onChange={handlePhoneChange}
//                   className={!isPhoneValid ? "border-red-500" : ""}
//                 />
//                 {!isPhoneValid && (
//                   <FieldDescription className="text-red-500">
//                     Please enter a valid phone number.
//                   </FieldDescription>
//                 )}
//               </Field>

//               {/* Date of Birth */}
//               <Field>
//                 <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
//                 <Input
//                   id="dob"
//                   type="date"
//                   required
//                   value={dob}
//                   onChange={(e) => setDob(e.target.value)}
//                 />
//               </Field>

//               {/* Email */}
//               <Field className="md:col-span-2">
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <FieldDescription>
//                   We&apos;ll never share your email with anyone.
//                 </FieldDescription>
//               </Field>

//               {/* Password */}
//               <Field>
//                 <FieldLabel htmlFor="password">Password</FieldLabel>
//                 <Input
//                   id="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {passwordStrength && (
//                   <FieldDescription
//                     className={`${
//                       passwordStrength === "Weak"
//                         ? "text-red-500"
//                         : passwordStrength === "Medium"
//                         ? "text-yellow-500"
//                         : "text-green-500"
//                     }`}
//                   >
//                     Password strength: {passwordStrength}
//                   </FieldDescription>
//                 )}
//               </Field>

//               {/* Confirm Password */}
//               <Field>
//                 <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <FieldDescription>Please confirm your password.</FieldDescription>
//               </Field>

//               {/* Error Message */}
//               {errorMessage && (
//                 <p className="text-red-500 text-sm mt-2 md:col-span-2">{errorMessage}</p>
//               )}

//               {/* Buttons */}
//               <Field className="md:col-span-2">
//                 <Button
//                   onClick={handleSignUp}
//                   className="mt-4 w-full"
//                   type="button"
//                 >
//                   Create Account
//                 </Button>
//                 <FieldDescription className="px-6 text-center mt-2">
//                   Already have an account?{" "}
//                   <a href="/login" className="underline">
//                     Sign in
//                   </a>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
