// import React from "react";
// import { motion, useAnimation } from "framer-motion";

// const letters = "Loading...".split("");

// export default function DarkBlurredBlobLoader() {
//     const controls1 = useAnimation();
//     const controls2 = useAnimation();
//     const controls3 = useAnimation();

//     React.useEffect(() => {
//         const loopBlob1 = async () => {
//             while (true) {
//                 await controls1.start({
//                     scale: [1, 1.25, 1],
//                     borderRadius: [
//                         "40% 60% 70% 30% / 60% 30% 70% 40%",
//                         "60% 40% 30% 70% / 40% 70% 30% 60%",
//                         "40% 60% 70% 30% / 60% 30% 70% 40%",
//                     ],
//                     x: [0, 20, 0],
//                     y: [0, -15, 0],
//                     opacity: [0.7, 0.9, 0.7],
//                     boxShadow: [
//                         "0 0 30px rgba(137,176,174,0.5)",
//                         "0 0 60px rgba(137,176,174,0.8)",
//                         "0 0 30px rgba(137,176,174,0.5)",
//                     ],
//                     transition: { duration: 6, ease: "easeInOut" },
//                 });
//             }
//         };
//         const loopBlob2 = async () => {
//             while (true) {
//                 await controls2.start({
//                     scale: [1, 1.15, 1],
//                     borderRadius: [
//                         "50% 50% 60% 40% / 50% 60% 50% 40%",
//                         "30% 70% 40% 60% / 70% 30% 60% 40%",
//                         "50% 50% 60% 40% / 50% 60% 50% 40%",
//                     ],
//                     x: [0, -25, 0],
//                     y: [0, 15, 0],
//                     opacity: [0.6, 0.85, 0.6],
//                     boxShadow: [
//                         "0 0 30px rgba(242,211,136,0.5)",
//                         "0 0 55px rgba(242,211,136,0.9)",
//                         "0 0 30px rgba(242,211,136,0.5)",
//                     ],
//                     transition: { duration: 7, ease: "easeInOut" },
//                 });
//             }
//         };
//         const loopBlob3 = async () => {
//             while (true) {
//                 await controls3.start({
//                     scale: [1, 1.3, 1],
//                     borderRadius: [
//                         "60% 40% 50% 50% / 40% 60% 50% 50%",
//                         "40% 60% 70% 30% / 60% 40% 30% 70%",
//                         "60% 40% 50% 50% / 40% 60% 50% 50%",
//                     ],
//                     x: [0, 30, 0],
//                     y: [0, 5, 0],
//                     opacity: [0.5, 0.8, 0.5],
//                     boxShadow: [
//                         "0 0 30px rgba(217,100,89,0.4)",
//                         "0 0 65px rgba(217,100,89,0.85)",
//                         "0 0 30px rgba(217,100,89,0.4)",
//                     ],
//                     transition: { duration: 6.5, ease: "easeInOut" },
//                 });
//             }
//         };

//         loopBlob1();
//         loopBlob2();
//         loopBlob3();
//     }, [controls1, controls2, controls3]);

//     return (
//         <div className="absolute z-50">
//             <motion.div
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: 1 }}
//                 style={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100vh",
//                     background:
//                         "radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%)",
//                     overflow: "hidden",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                     color: "#fff",
//                     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//                     userSelect: "none",
//                 }}
//             >
//                 {/* Frosted blur overlay behind blobs */}
//                 <div
//                     style={{
//                         position: "absolute",
//                         top: "15%",
//                         left: "10%",
//                         width: 420,
//                         height: 420,
//                         background:
//                             "rgba(20, 20, 20, 0.4)", // dark translucent
//                         backdropFilter: "blur(50px)",
//                         WebkitBackdropFilter: "blur(50px)",
//                         borderRadius: "50%",
//                         zIndex: 1,
//                     }}
//                 />

//                 {/* Rotating group of blobs */}
//                 <motion.div
//                     style={{
//                         position: "relative",
//                         width: 400,
//                         height: 400,
//                         zIndex: 2,
//                     }}
//                     animate={{
//                         rotate: [0, 360],
//                     }}
//                     transition={{
//                         repeat: Infinity,
//                         duration: 40,
//                         ease: "linear",
//                     }}
//                 >
//                     <motion.div
//                         animate={controls1}
//                         style={{
//                             position: "absolute",
//                             width: 180,
//                             height: 180,
//                             background: "#89b0ae",
//                             opacity: 0.7,
//                             filter: "drop-shadow(0 0 20px rgba(137,176,174,0.7))",
//                             top: "20%",
//                             left: "15%",
//                             borderRadius: "50%",
//                         }}
//                     />
//                     <motion.div
//                         animate={controls2}
//                         style={{
//                             position: "absolute",
//                             width: 150,
//                             height: 150,
//                             background: "#f2d388",
//                             opacity: 0.6,
//                             filter: "drop-shadow(0 0 25px rgba(242,211,136,0.8))",
//                             top: "50%",
//                             left: "55%",
//                             borderRadius: "50%",
//                         }}
//                     />
//                     <motion.div
//                         animate={controls3}
//                         style={{
//                             position: "absolute",
//                             width: 200,
//                             height: 200,
//                             background: "#d96459",
//                             opacity: 0.5,
//                             filter: "drop-shadow(0 0 28px rgba(217,100,89,0.9))",
//                             top: "65%",
//                             left: "40%",
//                             borderRadius: "50%",
//                         }}
//                     />
//                 </motion.div>

//                 {/* Wavy Loading Text */}
//                 <motion.div
//                     style={{
//                         marginTop: 30,
//                         display: "flex",
//                         gap: 6,
//                         fontSize: "3rem",
//                         fontWeight: "700",
//                         letterSpacing: "0.1em",
//                         userSelect: "none",
//                         zIndex: 10,
//                         color: "#fff",
//                         textShadow: "0 0 15px rgba(255,255,255,0.7)",
//                     }}
//                 >
//                     {letters.map((letter, i) => (
//                         <motion.span
//                             key={i}
//                             animate={{
//                                 y: [0, -12, 0],
//                                 opacity: [1, 0.7, 1],
//                             }}
//                             transition={{
//                                 delay: i * 0.12,
//                                 duration: 1.2,
//                                 repeat: Infinity,
//                                 repeatType: "loop",
//                                 ease: "easeInOut",
//                             }}
//                             style={{ display: "inline-block" }}
//                         >
//                             {letter}
//                         </motion.span>
//                     ))}
//                 </motion.div>
//             </motion.div>
//         </div>
//     );
// }
