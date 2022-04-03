import '../styles/globals.css'
import Head from 'next/head';
import MyAppShell from "../components/AppShell";
import React, {useState} from "react";
import {getCookie, setCookies} from 'cookies-next';
import {ColorScheme, ColorSchemeProvider, MantineProvider, Paper} from '@mantine/core';
import {useHotkeys} from "@mantine/hooks";
import {AppProps} from "next/app";
import {GetServerSidePropsContext} from "next";

export default function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
    const {Component, pageProps} = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        // when color scheme is updated save it to cookie
        setCookies('mantine-color-scheme', nextColorScheme, {maxAge: 60 * 60 * 24 * 30});
    };

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    return (
        <>
            <Head>
                <title>A&A Consult</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>

            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>

                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        fontFamily: 'Open Sans',
                        colorScheme: colorScheme
                    }}
                >
                    <Paper>
                        <MyAppShell>
                            <Component {...pageProps} />
                        </MyAppShell>
                    </Paper>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}

MyApp.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({
    // get color scheme from cookie
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
