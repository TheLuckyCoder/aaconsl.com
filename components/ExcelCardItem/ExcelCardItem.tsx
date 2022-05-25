import {ExcelProps} from "../../model/ExcelProps";
import {AspectRatio, Badge, Button, Card, Group, Image, Space, Stack, Text, useMantineTheme} from "@mantine/core";
import {useRouter} from "next/router";
import React from "react";

export default function ExcelCardItem(excelProps: ExcelProps, showDate: boolean = true): JSX.Element {
    const theme = useMantineTheme();
    const router = useRouter()

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{width: 340, margin: 'auto', height: "100%", paddingBottom: 16}}>
            <Card shadow="xl" p="lg" radius="md" style={{height: 480}}>
                <Card.Section>
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={"https://i.ytimg.com/vi/" + excelProps.youtubeUrl.replace("https://www.youtube.com/watch?v=", "") + "/hqdefault.jpg"}
                            width="340"
                            height="255"
                            alt="" imageProps={{"loading": "lazy"}}/>
                    </AspectRatio>
                </Card.Section>

                <Stack spacing="sm" style={{display: "flex", height: 260}}>

                    <Group position="apart" style={{marginBottom: 5, marginTop: theme.spacing.sm}}>
                        <Text weight={500}>{excelProps.name}</Text>
                        {showDate &&
                            <Badge color="pink" variant="light">
                                {(new Date(excelProps.date)).toLocaleDateString('ro-RO')}
                            </Badge>
                        }
                    </Group>
                    <div style={{flexGrow: 1}}>
                        <Text size="sm" style={{color: secondaryColor, lineHeight: 1.5}}>
                            {excelProps.summary}
                        </Text>
                    </div>

                    <Space h={"sm"}/>

                    <Button variant="light" color="blue" style={{}} fullWidth
                            onClick={() => router.push("/excel/" + excelProps.id)}>
                        Află mai multe
                    </Button>
                </Stack>
            </Card>
        </div>
    );
}
