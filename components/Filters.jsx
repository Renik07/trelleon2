
const Filters = ({isToggleFilters, handleToggleFilters, isDisabledLabelCasino, handleFilterChange, filterBoard}) => (
    <div className="filters">
        <h3 className="filterTitle" onClick={handleToggleFilters}>
            Фильтры
            <span>{isToggleFilters ? " \u2191" : " \u2193"}</span>
        </h3>
        {isToggleFilters && (
            <div className={`radioboxes ${isToggleFilters ? 'showFilters' : ''}`}>
                <label>
                    <input type="radio" name="board" value="all" checked={filterBoard.board === 'all'} onChange={handleFilterChange} />
                    <b>Все</b>
                </label>
                <label>
                    <input type="radio" name="board" value="casino" checked={filterBoard.board === 'casino'} onChange={handleFilterChange} />
                    <b>Casino</b>
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
                    <b>Bookmaker</b>
                </label>
            </div>
        )}
    </div>
)

export default Filters;