import React from 'react';
import {MdFilePresent, MdHome, MdHomeFilled, MdMail} from 'react-icons/md';
import {Group, Text, ThemeIcon, UnstyledButton, useMantineTheme} from '@mantine/core';
import {useRouter} from "next/router";
import styles from './MyAppShell.module.css'

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    link: string;
}

function MainLink({icon, color, label, link}: MainLinkProps) {
    const router = useRouter();
    const theme = useMantineTheme();

    return (
        <UnstyledButton
            onClick={() => router.push(link)}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                height: '60px',
                padding: theme.spacing.xs,
                borderRadius: 8,

                '&:hover': {
                    backgroundColor: '#155130',
                },
            })}
        >
            <Group noWrap={true}>
                <ThemeIcon color={color} size="lg">
                    {icon}
                </ThemeIcon>

                <Text size="md" weight={1000} color={theme.white} className={styles.mainLinksText}>{label.toUpperCase()}</Text>
            </Group>
        </UnstyledButton>
    );
}

const data = [
    {icon: <MdHomeFilled size={24}/>, color: 'blue', label: 'Acasă', link: '/'},
    {icon: <MdFilePresent size={24}/>, color: 'teal', label: 'Excel', link: '/excel'},
    {icon: <MdMail size={24}/>, color: 'orange', label: 'Contact', link: '/contact'},
];

export default function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label}/>);
    return <Group noWrap={true}>{links}</Group>;
}
