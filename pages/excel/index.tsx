import React, {ReactElement} from "react";
import Head from "next/head";
import {Divider, SimpleGrid, Space, Text, Title} from "@mantine/core";
import {ExcelProps} from "../../model/ExcelProps";
import ExcelCardItem from "../../components/ExcelCardItem";
import {getThumbnailUrl, getVideoId} from "../../utils/youtube";

export default function ExcelsList({list}): ReactElement {
    return (
        <>
            <Head>
                <title>Fișiere Excel - A&A Consult</title>
            </Head>

            <Title>Fișiere Excel</Title>

            <Space h="md" />

            <Text>Pentru a primi un fișier de mai jos, accesați formularul de pe pagina acestuia.</Text>

            <Divider my="md" variant="dashed" />

            <Space h="sm" />

            <SimpleGrid
                cols={1}
                breakpoints={[
                    {minWidth: 1750, cols: 4},
                    {minWidth: 1320, cols: 3},
                    {minWidth: 900, cols: 2},
                ]}
            >
                {list.map((excelProps) => {
                    return (<ExcelCardItem {...excelProps} key={excelProps.id}/>);
                })}
            </SimpleGrid>

        </>
    );
}

export async function getStaticProps({}) {
    const req = await fetch('https://server.aaconsl.com/excel');
    const data: ExcelProps[] = await req.json();

    for (const item of data) {
        const videoId = getVideoId(item.youtubeUrl);
        const thumbnail_response = await fetch(getThumbnailUrl(videoId));
        if (thumbnail_response.status == 200)
            item.thumbnailUrl = getThumbnailUrl(videoId, "maxresdefault")
        else
            item.thumbnailUrl = getThumbnailUrl(videoId, "hqdefault")
    }

    return {
        props: {list: data},
    }
}
