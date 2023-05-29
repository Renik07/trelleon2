import { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Head from 'next/head';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

import Cards from '../components/Cards';
import logo from '../public/img/logo.svg';

const idBoard = {
    casino: process.env.BOARD_ID,
    bookmaker: process.env.BOOKMAKER_ID
};

const idLabels = {
    leon: "643553227ed841c910d0923f",
    twin: "643553186ae513e787151a58",
    network: "61ee5f428166f38753ec04a2",
    exclusive: "61ee5f428166f38753ec04a0",
}

const Home = ({ data, imageUrls }) => {

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
    // 

    const filteredData = data.filter((card) => {
        const nameMatches = card.name.toLowerCase().includes(search.toLowerCase());
        const hasLeonLabel = card.labels.some((label) => label.id === idLabels.leon);
        const hasTwinLabel = card.labels.some((label) => label.id === idLabels.twin);
        const hasNetworkLabel = card.labels.some((label) => label.id === idLabels.network || label.id === idLabels.exclusive);
        const hasGroceryLabel = !card.labels.some((label) => label.id === idLabels.network || label.id === idLabels.exclusive);

        const hasSelectedLabels = filterBoard.labels.leon && filterBoard.labels.twin;

        if (filterBoard.board === "all") {
            return nameMatches;
        } else if (filterBoard.board === "casino") {
            if (hasSelectedLabels) {
                return nameMatches && (hasLeonLabel || hasTwinLabel) && (hasNetworkLabel || hasGroceryLabel);
            } else if (filterBoard.labels.leon) {
                if (filterBoard.labels.leonNetwork) {
                    return nameMatches && hasLeonLabel && hasNetworkLabel;
                }
                if (filterBoard.labels.leonGrocery) {
                    return nameMatches && hasLeonLabel && hasGroceryLabel;
                }
                return nameMatches && hasLeonLabel;
            } else if (filterBoard.labels.twin) {
                if (filterBoard.labels.twinNetwork) {
                    return nameMatches && hasTwinLabel && hasNetworkLabel;
                }
                if (filterBoard.labels.twinGrocery) {
                    return nameMatches && hasTwinLabel && hasGroceryLabel;
                }
                return nameMatches && hasTwinLabel;
            } else {
                return card.nameBoard === "CASINO" && nameMatches;
            }
        } else if (filterBoard.board === "bookmaker") {
            return card.nameBoard === "BOOKMAKER" && nameMatches;
        }

        return false;
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
                    <div className="filters">
                        <h3 className="filterTitle" onClick={handleToggleFilters}>
                            Фильтры
                            <span>{isToggleFilters ? " \u2191" : " \u2193"}</span>
                        </h3>
                        {isToggleFilters && (
                            <div className={`radioboxes ${isToggleFilters ? 'showFilters' : ''}`}>
                                <label>
                                    <input type="radio" name="board" value="all" checked={filterBoard.board === 'all'} onChange={handleFilterChange} />
                                    <bold>Все</bold>
                                </label>
                                <label>
                                    <input type="radio" name="board" value="casino" checked={filterBoard.board === 'casino'} onChange={handleFilterChange} />
                                    <bold>Casino</bold>
                                    <div className="labels">
                                        <label className="checkboxCasino">
                                            <input type="checkbox" disabled={isDisabledLabelCasino} name="leon" checked={filterBoard.labels.leon} onChange={handleFilterChange} />
                                            <span>Leon</span>
                                            <div className="labelsLeon">
                                                <label className="checkbox">
                                                    <input type="checkbox" disabled={!filterBoard.labels.leon} name="leonNetwork" checked={filterBoard.labels.leonNetwork} onChange={handleFilterChange} />
                                                    <span>Сетевые</span>
                                                </label>
                                                <label className="checkbox">
                                                    <input type="checkbox" disabled={!filterBoard.labels.leon} name="leonGrocery" checked={filterBoard.labels.leonGrocery} onChange={handleFilterChange} />
                                                    <span>Продуктовые</span>
                                                </label>
                                            </div>
                                        </label>
                                        <label className="checkboxCasino">
                                            <input type="checkbox" disabled={isDisabledLabelCasino} name="twin" checked={filterBoard.labels.twin} onChange={handleFilterChange} />
                                            <span>Twin</span>
                                            <div className="labelsTwin">
                                                <label className="checkbox">
                                                    <input type="checkbox" disabled={!filterBoard.labels.twin} name="twinNetwork" checked={filterBoard.labels.twinNetwork} onChange={handleFilterChange} />
                                                    <span>Сетевые</span>
                                                </label>
                                                <label className="checkbox">
                                                    <input type="checkbox" disabled={!filterBoard.labels.twin} name="twinGrocery" checked={filterBoard.labels.twinGrocery} onChange={handleFilterChange} />
                                                    <span>Продуктовые</span>
                                                </label>
                                            </div>
                                        </label>
                                    </div>
                                </label>
                                <label>
                                    <input type="radio" name="board" value="bookmaker" checked={filterBoard.board === 'bookmaker'} onChange={handleFilterChange} />
                                    <bold>Bookmaker</bold>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="grid">
                        <Cards data={filteredData} imageUrls={imageUrls} />
                    </div>
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const API_KEY = process.env.API_KEY;
    const API_TOKEN = process.env.API_TOKEN;

    const LIST_ID_DONE = process.env.LIST_ID_DONE; // casino board
    const LIST_ID_ARCHIVE = process.env.LIST_ID_ARCHIVE; // casino board

    const LIST_ID_DONE_BM = process.env.LIST_ID_DONE_BOOK; // bookmaker board
    const LIST_ID_ARCHIVE_BM = process.env.LIST_ID_ARCHIVE_BOOK; // bookmaker board

    // Получаем все пути к картинкам на сервере
    const getImageUrlsInProject = () => {
        const imageFolder = path.join(process.cwd(), 'public', 'trello');
        const imageFiles = fs.readdirSync(imageFolder);
        const imageUrls = imageFiles.map((file) => `/trello/${file}`);
        return imageUrls;
    };

    const fetchCardsByListId = async (listId, headers) => {
        const url = `https://api.trello.com/1/lists/${listId}/cards?fields=name,desc,cover,idBoard,board,labels,shortUrl&members=true&key=${API_KEY}&token=${API_TOKEN}&attachments=true`;
        const response = await fetch(url, { headers });
        const data = await response.json();
        return data;
    };

    const downloadImage = async (url, filename, API_KEY, API_TOKEN) => {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${API_TOKEN}"`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
            }
            // конвертация полученного изображения в arrayBuffer
            const buffer = await response.arrayBuffer();
            // Применение оптимизации и изменения размера с помощью sharp
            const optimizedBuffer = await sharp(buffer).resize(900).jpeg({ quality: 90 }).toBuffer();
            // создание пути к файлу на сервере
            const imagePath = path.join(process.cwd(), 'public', 'trello', filename);
            // сохранение изображения на сервере
            fs.writeFileSync(imagePath, Buffer.from(optimizedBuffer));

            console.log(`Image downloaded and saved: ${imagePath}`);
        } catch (error) {
            console.error('Error while downloading image:', error);
        }
    };

    const getImageUrl = async (card, API_KEY, API_TOKEN) => {
        if (card.cover && card.cover.scaled) {
            const imageUrl = `/trello/${card.id}.jpg`;
            // полный путь к файлу изображения на сервере
            const imagePath = path.join(process.cwd(), 'public', 'trello', `${card.id}.jpg`);
            // если такого изображения нет, то загружаем
            if (!fs.existsSync(imagePath)) {
                await downloadImage(
                    `https://api.trello.com/${card.cover.scaled[5].url.slice(19)}`,
                    `${card.id}.jpg`,
                    API_KEY,
                    API_TOKEN
                );
            }
            return imageUrl;
        }
        return null;
    };
    try {
        const headers = {
            Authorization: `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${API_TOKEN}"`
        };

        const responseListIDs = await Promise.all([
            fetchCardsByListId(LIST_ID_DONE, headers),
            fetchCardsByListId(LIST_ID_ARCHIVE, headers),
            fetchCardsByListId(LIST_ID_DONE_BM, headers),
            fetchCardsByListId(LIST_ID_ARCHIVE_BM, headers),
        ]);

        const allCards = responseListIDs.reduce((cards, response) => {
            const cardsWithCovers = response.filter(card => card.cover && card.cover.scaled);
            return [...cards, ...cardsWithCovers];
        }, []);

        const updatedAllCards = await Promise.all(
            allCards.map(async (card) => {
                const coverUrl = await getImageUrl(card, API_KEY, API_TOKEN);
                let nameBoard = '';
                if (card.idBoard) {
                    if (card.idBoard === idBoard.casino) nameBoard = 'CASINO';
                    if (card.idBoard === idBoard.bookmaker) nameBoard = 'BOOKMAKER';
                }
                return { ...card, coverUrl, nameBoard };
            })
        );

        const imageUrls = getImageUrlsInProject();
        return {
            props: {
                data: updatedAllCards,
                imageUrls: imageUrls,
            },
        };
    } catch (error) {
        console.error('Ошибка при получении карточек колонки:', error);
        return {
            props: {
                data: [],
            }
        };
    }
}

export default Home;