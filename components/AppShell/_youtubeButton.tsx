import React from 'react';
import {RiYoutubeFill} from 'react-icons/ri';
import {ActionIcon} from '@mantine/core';
import styles from './MyAppShell.module.css'

export default function YoutubeButton() {
    return (
        <a href={"https://www.youtube.com/channel/UCfAM-JzTYmKFsNQRJRgby_Q"} target="_blank" rel="noreferrer" className={styles.youtubeButton}>
            <ActionIcon
                variant="filled"
                color='red'
                title="Canal de YouTube"
            >
                <RiYoutubeFill size={18}/>
            </ActionIcon>
        </a>
    )
}
