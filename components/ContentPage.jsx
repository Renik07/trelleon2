import { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Head from 'next/head';
import Image from 'next/image';

import Cards from './Cards';
import logo from '../public/img/logo.svg';
import Filters from '@/components/Filters';

const idLabels = {
    leon: "643553227ed841c910d0923f",
    twin: "643553186ae513e787151a58",
    network: "61ee5f428166f38753ec04a2",
    exclusive: "61ee5f428166f38753ec04a0",
}

const ContentPage = ({ data, imageUrls }) => {

    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    // Скрыть / показать фильтры
    const [isToggleFilters, setIsToggleFilters] = useState(false);

    const handleToggleFilters = () => {
        setIsToggleFilters((prevState) => !prevState);
    }

    // активные/не активные чекбоксы Casino
    const [isDisabledLabelCasino, setIsDisabledLabelCasino] = useState(true);

    const [filterBoard, setFilterBoard] = useState({
        board: 'all',
        labels: {
            leon: false,
            twin: false,
            leonNetwork: false,
            leonGrocery: false,
            twinNetwork: false,
            twinGrocery: false
        }
    });

    const handleFilterChange = (event) => {
        if (event.target.name === 'board') {
            setFilterBoard((prevFilterBoard) => ({
                ...prevFilterBoard,
                board: event.target.value,
                labels: {
                    ...prevFilterBoard.labels,
                    leon: false,
                    twin: false,
                    leonNetwork: false,
                    leonGrocery: false,
                    twinNetwork: false,
                    twinGrocery: false
                }
            }));
            if (event.target.value === 'all' || event.target.value === 'bookmaker') {
                setIsDisabledLabelCasino(true);
            } else {
                setIsDisabledLabelCasino(false);
            }
        } else {
            if (event.target.name === 'leon') {
                if (!event.target.checked) {
                    setFilterBoard((prevFilterBoard) => ({
                        ...prevFilterBoard,
                        labels: {
                            ...prevFilterBoard.labels,
                            leon: false,
                            leonNetwork: false,
                            leonGrocery: false
                        }
                    }));
                }
            }
            if (event.target.name === 'twin') {
                if (!event.target.checked) {
                    setFilterBoard((prevFilterBoard) => ({
                        ...prevFilterBoard,
                        labels: {
                            ...prevFilterBoard.labels,
                            twin: false,
                            twinNetwork: false,
                            twinGrocery: false
                        }
                    }));
                }
            }
            setFilterBoard((prevFilterBoard) => ({
                ...prevFilterBoard,
                labels: {
                    ...prevFilterBoard.labels,
                    [event.target.name]: event.target.checked
                }
            }));
        }
    };
    // Фильтры
    const filteredData = data.filter((card) => {
        const nameMatches = card.name.toLowerCase().includes(search.toLowerCase());
        const hasLeonLabel = card.labels.some((label) => label.id === idLabels.leon);
        const hasTwinLabel = card.labels.some((label) => label.id === idLabels.twin);
        const hasNetworkLabel = card.labels.some((label) => label.id === idLabels.network);
        const hasExclusiveLabel = card.labels.some((label) => label.id === idLabels.exclusive);

        const isLeonSelected = filterBoard.labels.leon;
        const isLeonNetworkSelected = filterBoard.labels.leonNetwork;
        const isLeonGrocerySelected = filterBoard.labels.leonGrocery;

        const isTwinSelected = filterBoard.labels.twin;
        const isTwinNetworkSelected = filterBoard.labels.twinNetwork;
        const isTwinGrocerySelected = filterBoard.labels.twinGrocery;

        return (
            (filterBoard.board === "all" && nameMatches) ||
            (filterBoard.board === "casino" &&
                card.nameBoard === "CASINO" &&
                (
                    (isLeonSelected && !isLeonNetworkSelected && !isLeonGrocerySelected && (hasLeonLabel || (isTwinSelected && hasTwinLabel)) && nameMatches) ||
                    (isLeonSelected && isLeonNetworkSelected && (hasLeonLabel || (isTwinSelected && hasTwinLabel)) && (hasNetworkLabel || hasExclusiveLabel) && nameMatches) ||
                    (isLeonSelected && isLeonGrocerySelected && (hasLeonLabel || (isTwinSelected && hasTwinLabel)) && !hasNetworkLabel && !hasExclusiveLabel && nameMatches) ||
                    (isTwinSelected && !isTwinNetworkSelected && !isTwinGrocerySelected && hasTwinLabel && nameMatches) ||
                    (isTwinSelected && isTwinNetworkSelected && hasTwinLabel && (hasNetworkLabel || hasExclusiveLabel) && nameMatches) ||
                    (isTwinSelected && isTwinGrocerySelected && hasTwinLabel && !hasNetworkLabel && !hasExclusiveLabel && nameMatches) ||
                    (!isLeonSelected && !isTwinSelected && nameMatches)
                )
            ) ||
            (filterBoard.board === "bookmaker" && card.nameBoard === "BOOKMAKER" && nameMatches)
        );
    });

    // сортировка карточек по дате
    filteredData.sort((a, b) => {
        const dateA = new Date(a.attachments[a.attachments.length - 1].date.slice(0, 10));
        const dateB = new Date(b.attachments[b.attachments.length - 1].date.slice(0, 10));
        return dateB - dateA;
    });

    return (
        <>
            <Head>
                <title>Leon | Trello | Cards</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className="container">
                    <Image
                        className='logo'
                        src={logo}
                        alt="Logo Leon"
                    />
                    <input placeholder='Поиск...' className='input' type='text' value={search} onChange={handleSearch} />
                    <Filters
                        isToggleFilters={isToggleFilters}
                        handleToggleFilters={handleToggleFilters}
                        isDisabledLabelCasino={isDisabledLabelCasino}
                        handleFilterChange={handleFilterChange}
                        filterBoard={filterBoard}
                    />
                    <div className="grid">
                        <Cards data={filteredData} imageUrls={imageUrls} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default ContentPage;