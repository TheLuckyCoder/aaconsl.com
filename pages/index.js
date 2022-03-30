import styles from '../styles/Home.module.css'
import React from "react";
import {AspectRatio, Image} from "@mantine/core";

export default function Home() {
    return (
        <>
            <header className={styles.header}>
                <AspectRatio ratio={1} sx={{ maxWidth: 300 }} mx={"auto"}>
                    <Image src="/aaconsl.webp" width={300} height={300} alt="A&A Consult"/>
                </AspectRatio>
                <h1 className={styles.title}>
                    Bine ai venit la<br/><font color="#0070f3">A&A Consult</font>
                </h1>
            </header>

            <main className={styles.main}>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>
            </main>

            <footer className={styles.footer}>
                <a
                    href="http://theluckycoder.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Website realizat de&nbsp;<b>Filea Răzvan Gheorghe</b>
                </a>
            </footer>
        </>
    )
}
