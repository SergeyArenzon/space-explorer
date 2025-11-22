import json
import os
import re
import uuid
from datetime import datetime
from typing import Dict, List, Tuple
from models import HistoryItem, HistoryResult


class SpaceDB:
    def __init__(self):
        # Load and parse the JSON data
        data_path = os.path.join(os.path.dirname(__file__), "mock_data.json")
        with open(data_path, "r") as f:
            json_data = json.load(f)
        # Flatten and map the data to the expected format
        self._sources = []
        self._history: dict[str, HistoryItem] = {}
        self._sorted_history: list[str] = []

        items = json_data.get("collection", {}).get("items", [])
        for idx, item in enumerate(items, start=1):
            data = item.get("data", [{}])[0]
            links = item.get("links", [])
            image_url = None
            for link in links:
                if link.get("render") == "image":
                    image_url = link.get("href")
                    break
            self._sources.append(
                {
                    "id": idx,
                    "name": data.get("title", f"NASA Item {idx}"),
                    "type": data.get("media_type", "unknown"),
                    "launch_date": data.get("date_created", ""),
                    "description": data.get("description", ""),
                    "image_url": image_url,
                    "status": "Active",
                }
            )
        self._next_id = len(self._sources) + 1

    def compute_confidence_score(self, query: str, item: dict) -> int:
        """
        Compute weighted confidence score for object with:
        {
            "name": "...",
            "description": "..."
        }
        """
        name = item.get("name", "").lower()
        desc = item.get("description", "").lower()

        score = 0
        valid_words = 0

        for word in query:
            if len(word) < 3:
                continue
            
            valid_words += 1
            
            if word in name:
                score += 5

            if word in desc:
                score += 2

        # Max possible: each word can contribute 5 (name) + 2 (description) = 7 points
        max_possible = valid_words * 7

        if max_possible == 0:
            return 0

        return round((score / max_possible) * 100)
    
    def search_items(self, query: str) -> list[dict]:
        """
        Returns items with confidence score included,
        sorted by score DESC.
        """
        if not query:
            return self._sources
        q_words = re.findall(r"\w+", query.lower())

        results = []

        for item in self._sources:
            score = self.compute_confidence_score(q_words, item)
            if score > 0:
                results.append({
                    **item,
                    "confidence": score
                })


        # Sort highest-score first
        sorted_results = sorted(results, key=lambda x: x["confidence"], reverse=True)
        if query not in self._history:
            self.set_history(query, sorted_results, len(sorted_results))
        
        return sorted_results


    def get_history(self, page: int = 1, page_size: int = 3) -> Tuple[List[HistoryItem], int]:
        """Returns list of history items sorted by date (newest first) and total count."""
        total = len(self._sorted_history)
        start = (page - 1) * page_size
        end = start + page_size
        items_id = self._sorted_history[start:end]
        
        items = [self._history[item_q] for item_q in items_id]
        return items, total


    def set_history(self, query: str, results: list[dict], total: int) -> dict:
        new_history = HistoryItem(
            q=query,
            items=[],
            total=total,
            created_at=datetime.now()
        )

        for result in results:
            new_history.items.append(HistoryResult(
                source_id=result["id"],
                confidence=result["confidence"],
            ))

        self._history[new_history.q] = new_history

        # Prepend to keep newest first (more efficient than reversing)
        self._sorted_history.insert(0, query)
        return query

    def delete_from_sorted_history(self, q: str):
        if q in self._sorted_history:
            self._sorted_history.remove(q)
        else:
            raise ValueError(f"History item with id {q} not found")

    def delete_history(self, q: str):
        if q in self._history:
            del self._history[q]
        else:
            raise ValueError(f"History item with id {q} not found")


    def get_sources(self, page: int = 1, page_size: int = 5, q: str = None) -> Tuple[List[Dict], int]:
        """Get paginated space sources.
        
        Args:
            page: Page number (1-indexed)
            page_size: Number of items per page
            
        Returns:
            Tuple of (sources for the page, total count)
        """
        filtered_sources = {}
        total = 0
        new_history = None
        if q in self._history:
            print("HISTORY!!")
            filtered_sources = self._history[q].items
            total = self._history[q].total
            start = (page - 1) * page_size
            end = start + page_size
            items_id = filtered_sources[start:end]
            items = [{**self._sources[item.source_id - 1], "confidence": item.confidence} for item in items_id]
        else:
            print("REAL FETCH!!")
            filtered_sources = self.search_items(q)
            total = len(filtered_sources)
            start = (page - 1) * page_size
            end = start + page_size
            items = filtered_sources[start:end]
            if q != "":
                new_history = self._history[q]

        print(new_history)
        return items, total, new_history

