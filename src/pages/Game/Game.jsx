
import {Button, Stack, Typography} from "@mui/material";
import {HomeRounded, UndoRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

export default function Game() {
    const {state} = useLocation();
    const [shooterList, setShooterList] = useState(state || []);

    const [firstShoot, setFirstShoot] = useState(null);
    const [secondShoot, setSecondShoot] = useState(null);
    const [thirdShoot, setThirdShoot] = useState(null);

    // Ajout des points de belote pour les deux équipes
    const [belotePointsTeam1, setBelotePointsTeam1] = useState(0);
    const [belotePointsTeam2, setBelotePointsTeam2] = useState(0);

    // Calcul des scores totaux des équipes
    const totalScoreTeam1 = shooterList.reduce((acc, curr) => acc + curr.team1, 0);
    const totalScoreTeam2 = shooterList.reduce((acc, curr) => acc + curr.team2, 0);

    const saveShoot = (shootValue) => {
        if (shootValue === '162') {
            const newShooterList = [...shooterList, { team1: 162 + belotePointsTeam1, team2: 0 }];
            setShooterList(newShooterList);
            resetShoots();
        } else if (shootValue === '252') {
            const newShooterList = [...shooterList, { team1: 252 + belotePointsTeam1, team2: 0 }];
            setShooterList(newShooterList);
            resetShoots();
        } else if (shootValue === '0 -> 162') {
            const newShooterList = [...shooterList, { team1: 0, team2: 162 + belotePointsTeam2 }];
            setShooterList(newShooterList);
            resetShoots();
        } else if (shootValue === '0 -> 252') {
            const newShooterList = [...shooterList, { team1: 0, team2: 252 + belotePointsTeam2 }];
            setShooterList(newShooterList);
            resetShoots();
        } else {
            if (firstShoot === null) {
                setFirstShoot(shootValue);
            } else if (secondShoot === null) {
                setSecondShoot(shootValue);
            } else {
                setThirdShoot(shootValue);
            }
        }
    };

    useEffect(() => {
        if (thirdShoot !== null) {
            const totalHandleTeam1 = parseInt(firstShoot + secondShoot + thirdShoot);
            const totalHandleTeam2 = 162 - totalHandleTeam1;

            const newShooterList = [...shooterList, { team1: totalHandleTeam1 + belotePointsTeam1, team2: totalHandleTeam2 + belotePointsTeam2 }];
            setShooterList(newShooterList);

            resetShoots();
        }
    }, [thirdShoot]);

    const resetShoots = () => {
        setFirstShoot(null);
        setSecondShoot(null);
        setThirdShoot(null);
        setBelotePointsTeam1(0);
        setBelotePointsTeam2(0);
    };

    const undoLastShoot = () => {
        if((thirdShoot || secondShoot || firstShoot) !== null) {
            if (thirdShoot !== null) {
                setThirdShoot(null);
            } else if (secondShoot !== null) {
                setSecondShoot(null);
            } else if (firstShoot !== null) {
                setFirstShoot(null);
            }
        }
        else if (shooterList.length > 0) {
            const newShooterList = shooterList.slice(0, -1);  // Supprime la dernière manche
            setShooterList(newShooterList);  // Met à jour la liste des manches
        }
    };

    // Fonction pour ajouter les 20 points de belote pour l'équipe 1
    const addBelotePointsTeam1 = () => {
        setBelotePointsTeam1(20);
        setBelotePointsTeam2(0)
    };

    // Fonction pour ajouter les 20 points de belote pour l'équipe 2
    const addBelotePointsTeam2 = () => {
        setBelotePointsTeam2(20);
        setBelotePointsTeam1(0)
    };

    return (
        <>
            {/* Navigation des tireurs et bouton d'accueil */}
            <Stack width={'100%'} height={'60px'} flexDirection='row' justifyContent={'center'} alignItems={'center'} gap={1}>
                <Stack width={'80%'} height={'100%'} justifyContent={'center'} backgroundColor={'#2B2B2B'}>
                    <Typography width={'100%'} color={'white'} align={'center'} fontWeight={'bold'}>Score My Belote</Typography>
                </Stack>
                <Stack width={'20%'} height={'100%'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#2B2B2B'}>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <HomeRounded sx={{color: 'white'}}/>
                    </Link>
                </Stack>
            </Stack>

            {/* Tableau des scores */}
            <Stack width={'100%'} height={'calc(100dvh - 340px)'} alignItems={'center'} justifyContent={'center'}>
                <Stack width={'90%'} height={'95%'} gap={1} overflow={'scroll'}>
                    {shooterList.map((handle, index) => (
                        <Stack key={'Handle-' + index} height={'33px'} flexDirection='row' width={'100%'} borderRadius={3} gap={1}>
                            <Stack width={'100%'} backgroundColor={'#211B1B'} borderRadius={'10px 0 0 10px'} justifyContent={'center'}>
                                <Typography textAlign='center' fontWeight={'bold'} width={'100%'} color={'white'}>
                                    {handle.team1}
                                </Typography>
                            </Stack>
                            <Stack width={'100%'} backgroundColor={'#dc383f'} borderRadius={'0 10px 10px 0'} justifyContent={'center'}>
                                <Typography textAlign='center' fontWeight={'bold'} width={'100%'} color={'white'}>
                                    {handle.team2}
                                </Typography>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>

            {/* Boutons pour entrer les scores */}
            <Stack width={'100%'} height={'280px'} backgroundColor={'#2B2B2B'} alignItems={'center'} justifyContent={'space-around'}>
                <Stack height={'30px'} flexDirection='row' alignItems={'center'} width={'100%'}>
                    <Typography width={'100%'} align={'center'} fontWeight={'bold'} backgroundColor={'#2B2B2B'} color={'white'}>
                        {totalScoreTeam1}
                    </Typography>
                    <Typography width={'100%'} align={'center'} fontWeight={'bold'} backgroundColor={'#2B2B2B'} color={'#dc383f'}>
                        {totalScoreTeam2}
                    </Typography>
                </Stack>

                <Stack width={'90%'} flexDirection='row' height={'40px'} justifyContent={'space-between'}>
                    <Button variant='contained' sx={{padding: '5px 8px', minWidth: 'auto', borderRadius: '10px'}} color='error' onClick={undoLastShoot}>
                        <UndoRounded sx={{color: 'white'}}/>
                    </Button>
                    <Stack width={'40px'} height={'100%'} justifyContent={'center'} borderRadius={'10px'} backgroundColor={'white'} boxShadow={'inset 4px 4px 4px 0 rgba(43, 43, 43, .25)'}>
                        <Typography align='center' fontWeight={'bold'} fontSize={'20px'}>{firstShoot !== null && firstShoot}</Typography>
                    </Stack>
                    <Stack width={'40px'} height={'100%'} justifyContent={'center'} borderRadius={'10px'} backgroundColor={'white'} boxShadow={'inset 4px 4px 4px 0 rgba(43, 43, 43, .25)'}>
                        <Typography align='center' fontWeight={'bold'} fontSize={'20px'}>{secondShoot !== null && secondShoot}</Typography>
                    </Stack>
                    <Stack width={'40px'} height={'100%'} justifyContent={'center'} borderRadius={'10px'} backgroundColor={'white'} boxShadow={'inset 4px 4px 4px 0 rgba(43, 43, 43, .25)'}>
                        <Typography align='center' fontWeight={'bold'} fontSize={'20px'}>{thirdShoot !== null && thirdShoot}</Typography>
                    </Stack>
                    <Button variant='contained' sx={{width: '40px', minWidth: 'auto', borderRadius: '10px', fontWeight: 'bold', bgcolor: '#211B1B'}} onClick={addBelotePointsTeam1}>
                        B
                    </Button>
                    <Button variant='contained' sx={{width: '40px', minWidth: 'auto', borderRadius: '10px', fontWeight: 'bold', bgcolor: '#dc383f'}} onClick={addBelotePointsTeam2}>
                        B
                    </Button>
                </Stack>

                {/* Boutons pour les valeurs des tirs */}
                <Stack gap={2} width={'90%'} justifyContent={'center'}>
                    <Stack flexDirection='row' width={'100%'} height={'40px'} justifyContent={'space-between'}>
                        {['0', '1', '2', '3', '4', '5'].map(value => (
                            <Button key={value} variant='contained' sx={{padding: '0', fontSize: '1rem', minWidth: '40px', borderRadius: '10px', fontWeight: 'bold'}} onClick={() => saveShoot(value)}>
                                {value}
                            </Button>
                        ))}
                    </Stack>
                    <Stack flexDirection='row' width={'100%'} height={'40px'} justifyContent={'space-between'}>
                        {['6', '7', '8', '9', '162', '252'].map(value => (
                            <Button key={value} variant='contained' sx={{padding: '0', fontSize: '1rem', minWidth: '40px', borderRadius: '10px', fontWeight: 'bold'}} onClick={() => saveShoot(value)}>
                                {value}
                            </Button>
                        ))}
                    </Stack>
                    <Stack flexDirection='row' width={'100%'} height={'40px'} gap={'20px'}>
                        {['0 -> 162', '0 -> 252'].map(value => (
                            <Button key={value} variant='contained' sx={{padding: '0', width: '100%', fontSize: '1rem', borderRadius: '10px', fontWeight: 'bold'}} onClick={() => saveShoot(value)}>
                                {value}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}