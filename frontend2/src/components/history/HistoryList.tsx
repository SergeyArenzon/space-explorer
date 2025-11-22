import axios from "axios";
import { useEffect, useState, useCallback } from "react"
import HistoryItem from "./HistoryItem";
import type { HistoryItem as HistoryItemType } from "../../types/history.interface";
import { SpacePagination } from "../space/SpacePagination";
import { useHistoryStore } from "@/store/historyStore";

interface PaginatedHistoryResponse {
    items: HistoryItemType[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

const HistoryList = () => {
    const { history, setHistory, removeHistoryItem } = useHistoryStore();
    const [pagination, setPagination] = useState({
        page: 1,
        page_size: 3,
        total: 0,
        total_pages: 0,
    });

    const loadHistory = useCallback(async (isCancelled?: () => boolean) => {
        const response = await axios.get<PaginatedHistoryResponse>(
            `http://localhost:8000/api/history?page=${pagination.page}&page_size=${pagination.page_size}`
        );
        if (!isCancelled || !isCancelled()) {
            setHistory(response.data.items);
            setPagination({
                page: response.data.page,
                page_size: response.data.page_size,
                total: response.data.total,
                total_pages: response.data.total_pages,
            });
        }
    }, [pagination.page, pagination.page_size, setHistory]);

    const deleteHandler = useCallback((q: string) => {
        const deleteHistory = async () => {
            const response = await axios.delete(`http://localhost:8000/api/history/${q}`);
            if (response.status === 200) {
                // Remove from store and refetch current page after deletion
                removeHistoryItem(q);
                await loadHistory();
            } else {
                console.error('Failed to delete history');
            }
        }

        deleteHistory();
    }, [loadHistory, removeHistoryItem]);

    useEffect(() => {
        let cancelled = false;
        const checkCancelled = () => cancelled;
        const fetchData = async () => {
            await loadHistory(checkCancelled);
        };
        fetchData();
        return () => {
            cancelled = true;
        };
    }, [loadHistory])

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
    }
    

    return (
    <div className="flex flex-col">
        <h2 className="text-left text-lg font-bold mb-2">Recent</h2>
        <div>
            {history.map((item) => <HistoryItem key={item.q} history={item} deleteHandler={deleteHandler} />)}
        </div>
        <SpacePagination 
            currentPage={pagination.page} 
            totalPages={pagination.total_pages} 
            onPageChange={handlePageChange} 
        />
    </div>
  )
}

export default HistoryList