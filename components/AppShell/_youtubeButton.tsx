import React from 'react';
import {BrandYoutube} from 'tabler-icons-react';
import {ActionIcon, MANTINE_COLORS} from '@mantine/core';
import {useRouter} from "next/router";

export default function YoutubeButton() {
    const router = useRouter()

    return (
        <>
            <ActionIcon
                variant="filled"
                color='red'
                onClick={() => router.push("https://www.youtube.com/channel/UCfAM-JzTYmKFsNQRJRgby_Q")}
                title="Canalul de YouTube"
            >
                <BrandYoutube size={18}/>
            </ActionIcon>
        </>
    )
}
