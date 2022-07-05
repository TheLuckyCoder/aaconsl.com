import React, {useState} from "react";
import {
    AspectRatio,
    Box,
    Button, Card, Center, Container, Divider,
    Group, Image,
    LoadingOverlay,
    SimpleGrid,
    Space, Stack,
    Text,
    Textarea,
    TextInput,
    Title, useMantineTheme
} from "@mantine/core";
import {ExcelProps} from "../../model/ExcelProps";
import {useForm} from "@mantine/form";
import {MdAlternateEmail, MdContactPage} from "react-icons/md";
import {useRouter} from "next/router";

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/

enum FileRequestState {
    None,
    Loading,
    Success,
    Failed
}

async function sendContactRequest(fileId: number, {name, email, message}): Promise<boolean> {
    const body = {
        fileId, name, email, message
    }

    const response = fetch("https://server.aaconsl.com/request", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
    })
        .then((res) => {
            return res.ok
        })
        .catch(() => {
            return false;
        })

    return await response
}

function ContactForm(excelProps: ExcelProps): JSX.Element {
    const [requestState, setRequestState] = useState(FileRequestState.None)

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },

        validate: {
            email: (value) => value.toLowerCase().match(REGEX_EMAIL) ? null : "Email invalid",
        },
    });

    return (
        <Box sx={{maxWidth: 600}} mx="auto">
            <Space h="xl"/>

            {(requestState == FileRequestState.None || requestState == FileRequestState.Loading) &&
                <>
                    <Text>Dacă doriți acces la acest fișier vă rugăm să ne contactați folosind formularul de mai
                        jos:</Text>

                    <Space h="xs"/>

                    <form style={{position: 'relative'}} onSubmit={
                        form.onSubmit((values) => {
                            setRequestState(FileRequestState.Loading)
                            sendContactRequest(excelProps.id, values).then(ok => setRequestState(ok ? FileRequestState.Success : FileRequestState.Failed))
                        })}>

                        <TextInput
                            {...form.getInputProps('name')}
                            label="Nume"
                            placeholder="Numele și prenumele dumneavoastră"
                            minLength={8}
                            maxLength={30}
                            icon={<MdContactPage size={14}/>}
                            required
                        />

                        <Space h="xs"/>

                        <TextInput
                            {...form.getInputProps('email')}
                            placeholder="mail@example.com"
                            label="Adresă Email"
                            icon={<MdAlternateEmail size={14}/>}
                            required
                        />

                        <Space h="xs"/>

                        <Textarea
                            {...form.getInputProps('message')}
                            label="Mesaj"
                            placeholder="De ce doriți acest fișier"
                            autosize
                            minRows={2}
                            minLength={10}
                            maxLength={1000}
                            required
                        />

                        <LoadingOverlay
                            visible={requestState == FileRequestState.Loading}
                            loaderProps={{color: 'green', variant: 'bars'}}/>

                        <Group position="right" mt="md">
                            <Button type="submit">Trimite</Button>
                        </Group>

                    </form>
                </>
            }

            {requestState == FileRequestState.Success &&
                <Text>Formularul a fost trimis și înregistrat cu succes!</Text>
            }

            {requestState == FileRequestState.Failed &&
                <Text color='red'>A aparut o eroare în procesarea formularului, vă rugam să încercați din nou mai târziu
                    sau să ne contactați prin Email dacă problema persistă</Text>
            }

            <Space h="xl"/>
        </Box>
    )
}

export default function Excel({excelProps}): JSX.Element {
    const videoId = excelProps.youtubeUrl.replace("https://www.youtube.com/watch?v=", "")

    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (<>
        <Space h="xl"/>
        <Title align={"center"}>{excelProps.name}</Title>
        <Space h="xl"/>
        <Divider size="sm" variant="dashed"/>
        <Space h="xl"/>

        <Container fluid style={{padding: "6%"}}>
            <Card
                shadow="xl" p="xl" radius={0} withBorder>
                <Card.Section>
                    <AspectRatio ratio={16 / 9}>
                        <iframe id="ytplayer" width="100%" height="100%"
                                src={"https://www.youtube.com/embed/" + videoId + "?origin=https://aaconsl.com"}
                                frameBorder="0"></iframe>
                    </AspectRatio>
                </Card.Section>

                <Space h={"xl"}/>

                <Stack spacing="lg" style={{display: "flex", minHeight: 200}}>
                    <p className={'display-linebreak'} style={{color: secondaryColor, lineHeight: 1.6, fontSize: "18px"}}>
                        {excelProps.description}
                    </p>
                </Stack>
            </Card>
        </Container>
        {/*<SimpleGrid
            cols={1}
            spacing="xl"
            breakpoints={[
                {minWidth: 1200, cols: 2},
            ]}
        >

            <Text weight={3} className={'display-linebreak'}>{excelProps.description}</Text>

            <AspectRatio ratio={16 / 9}>
                <iframe id="ytplayer" width="100%" height="100%"
                        src={"https://www.youtube.com/embed/" + videoId + "?origin=https://aaconsl.com"}
                        frameBorder="0"></iframe>
            </AspectRatio>
        </SimpleGrid>*/}

        <Space h="xl"/>

        <ContactForm {...excelProps} />
    </>)
}

export async function getStaticProps({params}) {
    const req = await fetch('https://server.aaconsl.com/excel/' + params.id);
    const data: ExcelProps = await req.json();

    return {
        props: {excelProps: data},
    }
}

export async function getStaticPaths() {
    const req = await fetch('https://server.aaconsl.com/excel/');
    const data: ExcelProps[] = await req.json();

    data.sort((a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds())
    data.reverse()

    const paths = data.map(excelProps => {
        return {params: {id: excelProps.id.toString()}}
    })

    return {
        paths,
        fallback: false
    }
}
