import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch lawyers data from API
    async function fetchData() {
      await fetch("http://localhost:3001/lawyers")
        .then((response) => response.json())
        .then((data) => setLawyers(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
    fetchData();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLawyers = Array.from(lawyers);
    const [removed] = reorderedLawyers.splice(result.source.index, 1);
    reorderedLawyers.splice(result.destination.index, 0, removed);

    setLawyers(reorderedLawyers);
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    return (
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.firms.join().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  console.log(lawyers);

  return (
    <div className="mt-16">
      <div className="flex justify-center text-3xl font-serif font-semibold">
        Find The Perfect Lawyer For Your Needs
      </div>
      <input
        className="mx-auto mt-10 bg-gray-100 border text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-80 p-2.5 "
        type="text"
        placeholder="Search lawyers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={lawyers}>
          {(provided) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-3/6 text-sm text-gray-500 mt-10 mx-auto rounded-lg"
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 rounded-lg">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Speciality
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Law Firm
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Availibility
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLawyers.map((lawyer, index) => (
                  <Draggable
                    key={lawyer.id}
                    draggableId={lawyer.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          flexDirection: "row-reverse",
                        }}
                        class="bg-white border-b hover:bg-gray-50"
                      >
                        <td class="w-4 px-5 py-4">
                          <div class="flex items-start">{lawyer.name}</div>
                        </td>
                        <th
                          scope="row"
                          class="flex items-center px-5 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div class="px-5 py-4">
                            <div class="font-normal text-gray-500">
                              {lawyer.speciality}
                            </div>
                          </div>
                        </th>
                        <td class="px-5 py-4">{lawyer.firms}</td>
                        <td class="px-5 py-4">
                          <div class="flex items-center">
                            {lawyer.availableTime}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LawyerList;
