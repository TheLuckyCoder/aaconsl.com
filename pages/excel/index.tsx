import React from "react";
import Head from "next/head";
import {Badge, Card, Group, useMantineTheme, Text, Button, Image, Grid, SimpleGrid} from "@mantine/core";
import {useRouter} from "next/router";
import {ExcelProps} from "../../model/ExcelProps";

function CardItem(excelProps: ExcelProps) {
    const theme = useMantineTheme();
    const router = useRouter()

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{width: 340, margin: 'auto'}}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image
                        src={"https://img.youtube.com/vi/" + excelProps.youtubeUrl.replace("https://www.youtube.com/watch?v=", "") + "/maxresdefault.jpg"}
                        alt=""/>
                </Card.Section>

                <Group position="apart" style={{marginBottom: 5, marginTop: theme.spacing.sm}}>
                    <Text weight={500}>{excelProps.name}</Text>
                    <Badge color="pink" variant="light">
                        {(new Date(excelProps.date)).toLocaleDateString()}
                    </Badge>
                </Group>

                <Text size="sm" style={{color: secondaryColor, lineHeight: 1.5}}>
                    {excelProps.summary}
                </Text>

                <Button variant="light" color="blue" fullWidth style={{marginTop: 14}}
                        onClick={() => router.push("/excel/" + excelProps.id)}>
                    Citește mai mult
                </Button>
            </Card>
        </div>
    );
}

export default function ExcelsList({list}) {
    return (<div>
        <Head>
            <title>Fișiere Excel</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>

        <SimpleGrid
            cols={6}
            spacing="lg"
            breakpoints={[
                {maxWidth: 'md', cols: 3, spacing: 'md'},
                {maxWidth: 'sm', cols: 2, spacing: 'sm'},
                {maxWidth: 'xs', cols: 1, spacing: 'sm'},
            ]}
        >
            {list.map((excelProps) => {
                return (<CardItem {...excelProps} key={excelProps.id}/>);
            })}
        </SimpleGrid>

    </div>);
}

export async function getStaticProps({}) {
    const req = await fetch('http://razvanrares.go.ro:4009/excel/');
    const data: ExcelProps[] = await req.json();

    return {
        props: {list: data},
    }
}
