import React, { useState } from "react";
import link from '../public/img/link.svg';
import Image from 'next/image'
import ReactMarkdown from "react-markdown";
import { Modal } from "react-responsive-modal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = ({ card }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedElementID, setSelectedElementID] = useState(null);

    const openModal = (id) => {
        setSelectedElementID(id);
        setIsOpen(true);
    }

    const closeModal = () => {
        setSelectedElementID(null);
        setIsOpen(false);
    }
    return (
        <div className="item">
            <div>
                <a target="_blank" href={card.shortUrl} className="item-link">
                    <Image src={link} alt="link" />
                </a>
                <div className="item-inner" onClick={() => openModal(card.id)}>
                    <Image
                        className="grid-img"
                        alt="img"
                        width="100%"
                        height="auto"
                        src={card.coverUrl}
                        effect="blur"
                    />
                    <div className="item-content">
                        <div className="item-head">
                            <div
                                className={
                                    card.nameBoard === "CASINO" ? "labelCasino" : "labelBook"
                                }
                            >
                                {card.nameBoard}
                            </div>
                            <div className="date">
                                {card.attachments &&
                                    card.attachments[card.attachments.length - 1].date
                                    ? card.attachments[card.attachments.length - 1].date.slice(
                                        0,
                                        10
                                    )
                                    : "date"}
                            </div>
                            <div className="author">
                                by{" "}
                                {card.members[0] && card.members[0].fullName
                                    ? card.members[0].fullName
                                    : "name"}{" "}
                            </div>
                        </div>
                        <h3 className="item-title">{card.name}</h3>
                    </div>
                </div>
                {selectedElementID === card.id && (
                    <Modal
                        open={modalIsOpen}
                        onClose={closeModal}
                        classNames="modal"
                        center
                    >
                        <LazyLoadImage
                            className="modal-img"
                            alt="modal image"
                            width="100%"
                            height="auto"
                            src={card.coverUrl}
                            effect="blur"
                        />
                        <div className="modal-content">
                            <div className="modal-head">
                                <div
                                    className={
                                        card.nameBoard === "CASINO" ? "labelCasino" : "labelBook"
                                    }
                                >
                                    {card.nameBoard}
                                </div>
                                <span className="modal-date date">
                                    {card.attachments &&
                                        card.attachments[card.attachments.length - 1].date
                                        ? card.attachments[card.attachments.length - 1].date.slice(
                                            0,
                                            10
                                        )
                                        : "date"}
                                </span>
                                <span className="modal-author author">
                                    by{" "}
                                    {card.members[0] && card.members[0].fullName
                                        ? card
                                            .members[0].fullName
                                        : "name"}
                                </span>
                                <a target="_blank" href={card.shortUrl} className="modal-link">
                                    <Image src={link} alt="link" />
                                </a>
                            </div>
                            <h2 className="modal-title">{card.name}</h2>
                            <ReactMarkdown className="modal-desc">{card.desc}</ReactMarkdown>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default Card;