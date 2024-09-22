
import {Button, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function Home() {

    const shooterList = [];

    return (
        <>
            <Stack width={'100%'} height={'60px'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#2B2B2B'}>
                <Typography color={'white'} fontWeight={'bold'}>SHOTRECORD</Typography>
            </Stack>
            <Stack width={'100%'} height={'calc(100dvh - 60px)'} alignItems={'center'} justifyContent={'center'}>
                <Link to={"/Game"} state={shooterList} style={{textDecoration: 'none'}}>
                    <Button variant='contained'>Prêt</Button>
                </Link>
            </Stack>
        </>
    );
}