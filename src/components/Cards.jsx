import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard';
import Confetti from 'react-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import SecretCodeCard from './SecretCodeCard';

export default function Cards({ setMusicPlaying, handleShowMainContent }) {
    const [cardState, setCardState] = useState("initial"); // Tracks the current card
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [showConfetti, setShowConfetti] = useState(false)

    // Function to go back to "Annie g can you be mine forever" card
    const goToMainQuestion = () => setCardState("mainQuestion");

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        updateWindowSize()
        window.addEventListener('resize', updateWindowSize)
        return () => window.removeEventListener('resize', updateWindowSize)
    }, [])

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        updateWindowSize()
        window.addEventListener('resize', updateWindowSize)

        return () => {
            window.removeEventListener('resize', updateWindowSize)
        }
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="min-h-screen flex items-center justify-center p-4">
                {/* Conditionally render cards based on the state */}
                {cardState === "initial" && (
                    <QuestionCard
                        key="initial-card"
                        emoji="💖"
                        question="At first, I want to ask you something before we go ahead..."
                        showButtons={false}
                        btnText="Click here to know"
                        onAnswer={() => {
                            setCardState("mainQuestion")
                            setMusicPlaying(true)
                        }}
                    />
                )}

                {cardState === "mainQuestion" && (
                    <QuestionCard
                        key="main-question"
                        emoji="🥰"
                        question="Moi Qurat ul ain g you be mine forever?"
                        onAnswer={(answer) => {
                            if (answer) {
                                setCardState("yesResponse")
                                setShowConfetti(true)
                            }
                            else setCardState("areYouSureJanah");
                        }}
                    />
                )}

                {cardState === "yesResponse" && (
                    <QuestionCard
                        key="yes-response"
                        emoji="🩷"
                        question="Yesss! You always make my heart smile ummmmmmahhh! I’m so lucky to have you in my life Annie g u r owsome."
                        showButtons={false}
                        btnText="More love ahead"
                        onAnswer={() => setCardState("secretCode")} // Add a new action here
                    />
                )}

                {cardState === "secretCode" && <SecretCodeCard onCorrect={handleShowMainContent} />}

                {cardState === "areYouSure" && (
                    <QuestionCard
                        key="are-you-sure"
                        emoji="🙃"
                        question="Are you sure?"
                        onAnswer={(answer) => {
                            if (answer) setCardState("finalNoResponse");
                            else goToMainQuestion();
                        }}
                    />
                )}

                {cardState === "finalNoResponse" && (
                    <QuestionCard
                        key="final-no-response"
                        emoji="🥺"
                        question="Oh no! You can't really say no to this! You're already mine. Go back and make the right choice!"
                        showButtons={false}
                        btnText="Go back"
                        onAnswer={goToMainQuestion}
                    />
                )}
                {showConfetti &&
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        numberOfPieces={500}
                        recycle={false}
                        colors={['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093', '#C71585']}
                        confettiSource={{
                            x: windowSize.width / 2,
                            y: windowSize.height / 2,
                            w: 0,
                            h: 0
                        }}
                        initialVelocityX={{ min: -7, max: 7 }}
                        initialVelocityY={{ min: -7, max: 7 }}
                        gravity={0.015}
                        tweenDuration={4000}
                    />}
            </motion.div>
        </AnimatePresence>
    )
}
