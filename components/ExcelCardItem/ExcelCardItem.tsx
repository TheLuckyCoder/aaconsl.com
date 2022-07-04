import {ExcelProps} from "../../model/ExcelProps";
import {AspectRatio, Card, Image, Space, Stack, Text, useMantineTheme} from "@mantine/core";
import {useRouter} from "next/router";
import React from "react";

export default function ExcelCardItem(excelProps: ExcelProps): JSX.Element {
    const theme = useMantineTheme();
    const router = useRouter();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{width: 400, margin: 'auto', height: "100%", paddingBottom: 16, offset: "20px"}}
             onClick={() => router.push("/excel/" + excelProps.id)}>
            <Card
                shadow="xl" p="lg" radius="sm"
                style={{height: 460, transition: 'margin .3s ease-in-out'}}
                sx={() => ({
                    '&:hover': {
                        marginTop: -3,
                    },
                })}>
                <Card.Section>
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={"https://i.ytimg.com/vi/" + excelProps.youtubeUrl.replace("https://www.youtube.com/watch?v=", "") + "/hqdefault.jpg"}
                            width="340"
                            height="255"
                            alt="" imageProps={{"loading": "lazy"}}/>
                    </AspectRatio>
                </Card.Section>

                <Space h={"md"}/>

                <Stack spacing="sm" style={{display: "flex", height: 260}}>
                    <Text size="lg" weight={700}
                          style={{marginBottom: 5, marginTop: theme.spacing.sm}}>{excelProps.name}</Text>

                    <div style={{flexGrow: 1}}>
                        <Text size="md" align={"justify"} style={{color: secondaryColor, lineHeight: 1.5}}>
                            {excelProps.summary}
                        </Text>
                    </div>
                </Stack>
            </Card>
        </div>
    );
}
