import styles from '../styles/Home.module.css'
import React from "react";
import {AspectRatio, Image, SimpleGrid} from "@mantine/core";
import {ExcelProps} from "../model/ExcelProps";
import ExcelCardItem from "../components/ExcelCardItem";

export default function Home({list}) {
    return (<>
            <header className={styles.header}>
                <AspectRatio ratio={1} sx={{ maxWidth: 300 }} mx={"auto"}>
                    <Image src="/aaconsl.webp" width={"100%"} height={"100%"} alt="A&A Consult"/>
                </AspectRatio>
                <h1 className={styles.title}>
                </h1>
                <h1 className={styles.title}>
                    <a>Bine ai venit la<br/>A&A Consult</a>
                </h1>
            </header>

            <main className={styles.main}>
                <p className={styles.quote}>
                    ❝Uşor de folosit - Cât mai puţine greşeli - Timp câştigat❞
                </p>

                <p className={styles.description}>
                    Dacă ești interesat de fișiere Excel care îți automatizează munca, pentru tine sau compania ta, nu ezita sa ne contactezi.
                </p>

                <SimpleGrid
                    cols={1}
                    spacing="xl"
                    breakpoints={[
                        {minWidth: 840, cols: 2},
                    ]}
                >
                    {list.map((excelProps) => {
                        return (<ExcelCardItem {...excelProps} key={excelProps.id} />);
                    })}
                </SimpleGrid>
            </main>
        </>)
}

export async function getStaticProps({}) {
    const req = await fetch('https://server.aaconsl.com/excel/');
    const data: ExcelProps[] = await req.json();

    data.sort((a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds())
    data.reverse()
    return {
        props: {list: data.slice(0, 4)},
    }
}
