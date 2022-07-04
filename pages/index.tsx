import styles from '../styles/Home.module.css'
import React from "react";
import {AspectRatio, Image, MediaQuery, SimpleGrid, Space, Text} from "@mantine/core";
import {ExcelProps} from "../model/ExcelProps";
import ExcelCardItem from "../components/ExcelCardItem";

import mainBackground_3_2 from '../public/main_background_3_2.svg'
import mainBackground_2_3 from '../public/main_background_2_3.svg'
import {useMediaQuery} from "@mantine/hooks";

const mainBackgroundStyle_3_2 = {
    backgroundImage: `url('${mainBackground_3_2.src}')`,
    aspectRatio: "3 / 2",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
}

const mainBackgroundStyle_2_3 = {
    backgroundImage: `url('${mainBackground_2_3.src}')`,
    width: "100%",
    aspectRatio: "2 / 3",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
}

export default function Home({list}) {
    const matches = useMediaQuery('(min-aspect-ratio: 4/3)', false);

    const content = (<>
        <AspectRatio ratio={1} sx={{maxWidth: 300}} mx={"auto"}>
            <Image src="/aaconsl.webp" width={"100%"} height={"100%"} alt="A&A Consult"/>
        </AspectRatio>
        <h1 className={styles.title}>
            <a>Bine ai venit la<br/>A&A Consult</a>
        </h1>

        <Text size={"xl"} color={"white"} align={"center"} style={{
            fontFamily: "monospace",
            textShadow: "-webkit-text-stroke: 1px black;",
            paddingLeft: "em",
            paddingRight: "em",
        }}>
            Fie pentru tine sau compania ta, dacă ești interesat de fișiere Excel care îți automatizează munca,<br/>
            nu ezita să ne contactezi.
        </Text>
    </>)

    return (<>
        <div style={{margin: "-20px", width: "calc(100% + 20px * 2)"}}>
        <div style={matches ? mainBackgroundStyle_3_2 : mainBackgroundStyle_2_3}>
            {content}
        </div>
        </div>

        <div className={styles.main}>
            <p className={styles.quote}>
                ❝Uşor de folosit - Cât mai puţine greşeli - Timp câştigat❞
            </p>

            <SimpleGrid
                cols={1}
                spacing="xl"
                breakpoints={[
                    {minWidth: 840, cols: 2},
                ]}
            >
                {list.map((excelProps) => {
                    return (<ExcelCardItem {...excelProps} key={excelProps.id}/>);
                })}
            </SimpleGrid>
        </div>
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
