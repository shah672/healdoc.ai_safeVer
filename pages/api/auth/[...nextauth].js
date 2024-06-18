import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            });

            if (!user) {
                return null;
            }

            const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
            
            if (!passwordMatch) {
                return null;
            }

            return { id: user.id, name: user.name, email: user.email };
        // Your authorize logic here
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };







 
 
 
 
 
 
 
 
 
 
 
//   providers: [
//    CredentialsProvider({
//      name: "Credentials",


//      credentials: {
//        email: { label: "email", type: "text" },
//        password: { label: "Password", type: "password" }
//      },


//      async authorize(credentials, req) {
//        let response;


//        try {
//          const url = "/api/_actions/auth";
//          response = await fetch(url, {
//            method: "POST",
//            headers: {
//              "Content-Type": "application/json",
//            },
//            body: JSON.stringify({
//              email: credentials?.email ?? "",
//              password: credentials?.password ?? "",
//            }),
//          });


//          if (!response.ok) {
//            throw new Error("Authorization error");
//          }
//        } catch (error) {
//          throw new Error("Authorization error");
//        }


//        const user = await response.json();


//        // Add logic here to look up the user from the credentials supplied
//        if (user) {
//          // Any object returned will be saved in `user` property of the JWT
//          return user;
//        } else {
//          // If you return null then an error will be displayed advising the user to check their details.
//          return null;


//          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//        }
//      }
//    })
//  ],
//  callbacks: {
//    async jwt({ token, user }) {
//      return { ...token, ...user };
//    },
//    async session({ session, token, user }) {
//      session.user = token as any;
//      return session;
//    },
//  },
// });








// // import NextAuth from 'next-auth';
// // import CredentialsProvider from 'next-auth/providers/credentials';


// // export default NextAuth({
// //   providers: [
// //     CredentialsProvider({
// //       name: 'Credentials',
// //       credentials: {
// //         email: { label: 'Email', type: 'email' },
// //         password: { label: 'Password', type: 'password' },
// //       },
// //       async authorize(credentials) {
// //         const res = await fetch('http://localhost:3000/api/auth', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(credentials),
// //         });


// //         const data = await res.json();


// //         if (res.ok) {
// //           return { userId: data.userId };
// //         } else {
// //           throw new Error('Invalid email or password');
// //         }
// //       },
// //     }),
// //   ],
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.userId = user.userId;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       session.user = { userId: token.userId };
// //       return session;
// //     },
// //   },
// // });


