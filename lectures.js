document.addEventListener("DOMContentLoaded", () => {
    const lectureContainer = document.getElementById("lectureContainer");
    const filterAuthorInput = document.getElementById("filterAuthor");
    const filterDateInput = document.getElementById("filterDate");
    const userHistoryList = document.getElementById("activityList"); // Reference to the history list
    let lecturesData = []; // To store the original lecture data
    let userHistory = []; // To store the user's activity history

    // Fetch lecture data and populate lecturesData
    fetch("lectures.json")
        .then(response => response.json())
        .then(data => {
            lecturesData = data;
            updateLectureDisplay(lecturesData);
        })
        .catch(error => {
            console.error("Error fetching lecture data:", error);
        });

        

    // Update the displayed lecture based on filters
    function updateLectureDisplay(data) {
        let lecturesHTML = "";

        data.forEach(lecture => {
            const lectureURL = `HtmlInsidelecture.html?id=${encodeURIComponent(lecture.title)}`;
            lecturesHTML += `
                <a href="${lectureURL}" class="lecture-link">
                    <div class="lecture-iframe">
                        <h3>${lecture.title}</h3>
                        <p>Author: ${lecture.author}</p>
                        <p>Date: ${lecture.date}</p>
                    </div>
                </a>
            `;
        });

        lectureContainer.innerHTML = lecturesHTML;

        // Attach click event listener to lecture links
        const lectureTitles = document.querySelectorAll('.lecture-link h3');
        lectureTitles.forEach(title => {
            title.addEventListener('click', trackUserActivity);
        });
    }

    // Function to track user activity
    function trackUserActivity(event) {
        const clickedLecture = event.currentTarget.querySelector('h3').textContent;
        const timestamp = new Date().toLocaleString();

        userHistory.push({ lecture: clickedLecture, timestamp });
        updateHistoryDisplay();
    }

    // Update the displayed user history
    function updateHistoryDisplay() {
        const historyHTML = userHistory.map(activity => {
            return `<li>${activity.lecture} - ${activity.timestamp}</li>`;
        }).join('');
    
        userHistoryList.innerHTML = historyHTML;
    }

    // Filter and update lectures based on filters
    function applyFilters() {
        const filterAuthorValue = filterAuthorInput.value.toLowerCase();
        const filterDateValue = filterDateInput.value;

        const filteredData = lecturesData.filter(lecture =>
            lecture.author.toLowerCase().includes(filterAuthorValue) &&
            lecture.date.includes(filterDateValue)
        );

        updateLectureDisplay(filteredData);
    }

    filterAuthorInput.addEventListener("input", applyFilters);
    filterDateInput.addEventListener("input", applyFilters);
});
