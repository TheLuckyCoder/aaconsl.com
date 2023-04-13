import {ExcelProps} from "../../model/ExcelProps";
import {AspectRatio, Card, Image, Space, Stack, Text, useMantineTheme} from "@mantine/core";
import React from "react";
import Link from "next/link";
import {getThumbnailUrl, getVideoId} from "../../utils/youtube";

export default function ExcelCardItem(excelProps: ExcelProps): JSX.Element {
    const videoId = getVideoId(excelProps.youtubeUrl)
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{maxWidth: 400, margin: 'auto', height: "100%", paddingBottom: 16, offset: "20px"}}>
            <Link href={"/excel/" + excelProps.id} passHref={true}>
                <Card
                    shadow="xl" p="lg" radius="sm"
                    style={{height: 460, transition: 'margin .4s ease-in-out'}}
                    sx={() => ({
                        '&:hover': {
                            marginTop: -4,
                        },
                    })}>
                    <Card.Section>
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                fit={"contain"}
                                src={getThumbnailUrl(videoId)}
                                width="100%"
                                height="360"
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
            </Link>
        </div>
    );
}
