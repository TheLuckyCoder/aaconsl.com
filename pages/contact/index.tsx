import {Center, Group, Stack, Text, ThemeIcon, Tooltip, UnstyledButton} from "@mantine/core";
import React from "react";
import {useClipboard} from "@mantine/hooks";
import {MdLibraryAddCheck, MdLocationPin, MdMail, MdOutlineContentCopy, MdPhone} from "react-icons/md";

interface ContactInfoProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    content: string;
}

function CopyIcon({isCopied}): JSX.Element {
    if (isCopied) {
        return (<MdLibraryAddCheck size={18}/>);
    }

    return (<MdOutlineContentCopy size={18}/>);
}

function ContactInfoLabel(props: ContactInfoProps): JSX.Element {
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
                    <ThemeIcon size="xl" color={props.color} variant="light">
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
    {icon: <MdPhone size={24}/>, color: 'pink', label: 'Telefon', content: '+40747297093'},
    {icon: <MdMail size={24}/>, color: 'blue', label: 'Email', content: 'customfilepro@gmail.com'},
    {icon: <MdLocationPin size={24}/>, color: 'red', label: 'Locație', content: 'Sibiu, Str. Calțun Nr. 15, 550298'}
];

function ContactInfoLabels(): JSX.Element {
    const labels = data.map((label) => <ContactInfoLabel {...label} key={label.label}/>);
    return <Stack>{labels}</Stack>;
}

export default function Contact(): JSX.Element {

    return (
        <Center p="xl">
            <ContactInfoLabels/>
        </Center>
    );
}
