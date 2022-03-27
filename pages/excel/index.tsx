import React from "react";
import Head from "next/head";
import {
    AspectRatio,
    Badge,
    Button,
    Card,
    Group,
    Image,
    SimpleGrid,
    Space,
    Text,
    Title,
    useMantineTheme
} from "@mantine/core";
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
            <Card shadow="xl" p="lg" radius="md">
                <Card.Section>
                    <AspectRatio ratio={1280 / 720}>
                        <Image
                            src={"https://img.youtube.com/vi/" + excelProps.youtubeUrl.replace("https://www.youtube.com/watch?v=", "") + "/maxresdefault.jpg"}
                            alt=""/>
                    </AspectRatio>
                </Card.Section>

                <Group position="apart" style={{marginBottom: 5, marginTop: theme.spacing.sm}}>
                    <Text weight={500}>{excelProps.name}</Text>
                    <Badge color="pink" variant="light">
                        {(new Date(excelProps.date)).toLocaleDateString('ro-RO')}
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
    return (
        <>
            <Head>
                <title>Fișiere Excel - A&A Consult</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>

            <Title>Fișiere Excel</Title>

            <Text>Pentru a primi un fișier de mai jos, accesați formularul de pe pagina acestuia.</Text>

            <Space h="xs"/>

            <SimpleGrid
                cols={1}
                breakpoints={[
                    {minWidth: 1800, cols: 5},
                    {minWidth: 1480, cols: 4},
                    {minWidth: 1100, cols: 3},
                    {minWidth: 740, cols: 2},
                ]}
            >
                {list.map((excelProps) => {
                    return (<CardItem {...excelProps} key={excelProps.id}/>);
                })}
            </SimpleGrid>

        </>
    );
}

export async function getStaticProps({}) {
    const req = await fetch('http://razvanrares.go.ro:4009/excel/');
    const data: ExcelProps[] = await req.json();

    return {
        props: {list: data},
    }
}
