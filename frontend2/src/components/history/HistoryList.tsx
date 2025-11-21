import axios from "axios";
import { useEffect, useState } from "react"
import HistoryItem from "./HistoryItem";
import type { HistoryItem as HistoryItemType } from "../../types/history.interface";




const HistoryList = () => {
    const [history, setHistory] = useState<HistoryItemType[]>([]);
    

    const deleteHandler = (q: string) => {
        const deleteHistory = async () => {
            const response = await axios.delete(`http://localhost:8000/api/history/${q}`);
            if (response.status === 200) {
                setHistory(history.filter((item) => item.q !== q));
            } else {
                console.error('Failed to delete history');
            }
        }

        deleteHistory();
    }

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await axios.get('http://localhost:8000/api/history');
            setHistory(response.data);
        }
        fetchHistory();
    }, [])
    

    return (
    <div className="flex flex-col">
        <h2 className="text-left text-lg font-bold mb-2">Recent</h2>
        {history.map((item) => <HistoryItem key={item.id} history={item} deleteHandler={deleteHandler} />)}
    </div>
  )
}

export default HistoryList