import {Group, SimpleGrid, Text, ThemeIcon, Tooltip, UnstyledButton} from "@mantine/core";
import React from "react";
import {useClipboard} from "@mantine/hooks";
import {Check, Copy, Mail, MapPin, Phone} from "tabler-icons-react";

interface ContactInfoProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    content: string;
}

function CopyIcon({isCopied}) {
    if (isCopied) {
        return (<Check size={18}/>);
    }

    return (<Copy size={18}/>);
}

function ContactInfoLabel(props: ContactInfoProps) {
    const clipboard = useClipboard({timeout: 4000});

    return (
        <Tooltip
            radius="md"
            label={"Click pentru copia: " + props.content}
            openDelay={250}
            withArrow
        >
            <UnstyledButton
                onClick={() => clipboard.copy(props.content)}
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
                    },
                })}
            >
                <Group noWrap={true}>
                    <ThemeIcon color={props.color} variant="light">
                        {props.icon}
                    </ThemeIcon>

                    <Text size="md">{props.label + ': '}</Text>
                    <Text size="md" color={"blue"}>{props.content}</Text>

                    <CopyIcon isCopied={clipboard.copied}/>
                </Group>
            </UnstyledButton>
        </Tooltip>
    );
}

const data: ContactInfoProps[] = [
    {icon: <Phone size={28}/>, color: 'pink', label: 'Telefon', content: '+40747297093'},
    {icon: <Mail size={28}/>, color: 'blue', label: 'Email', content: 'customfilepro@gmail.com'},
    {icon: <MapPin size={28}/>, color: 'red', label: 'Locație', content: 'Sibiu, Str. Calțun Nr. 15, 550298'}
];

function ContactInfoLabels() {
    const labels = data.map((label) => <ContactInfoLabel {...label} key={label.label}/>);
    return <Group direction="column" noWrap={true}>{labels}</Group>;
}

// TODO Move map to the right
export default function Contact() {
    return (
        <SimpleGrid
            cols={1}
            spacing="xl"
            breakpoints={[
                {minWidth: 1260, cols: 2, spacing: 'md'},
            ]}>
            <ContactInfoLabels/>

            <iframe width="600" height="450" loading="lazy" allowFullScreen
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJje84s3lnTEcRjxhlSaAPMY0&key=AIzaSyDhyDBFfYNit3dLA9sfF1PWvt48T6jFpuc"></iframe>
        </SimpleGrid>
    );
}
