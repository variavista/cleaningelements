import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Save, Trash2, X, AlertCircle } from 'lucide-react';
import { Element, Room, Zone } from '../../types';
import { useDatabase } from '../../hooks/useDatabase';
import { elementOptions } from './ElementOptions';
import ElementSelector from './ElementSelector';
import Toast from '../ui/Toast';

const RoomManagement = () => {
  const { getRooms, addRoom, updateRoom, deleteRoom } = useDatabase();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Room>>({});
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone>('Libre');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const zones: Zone[] = ['Libre', 'Cocina', 'Terraza', 'Azotea', 'Pasillos', 'Escaleras'];

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedRooms = await getRooms();
      setRooms(loadedRooms);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setError('Error al cargar las habitaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleElementSelect = (element: Element) => {
    // Check if element already exists in rooms
    const elementExists = rooms.some(room => room.element === element);
    if (elementExists) {
      setError(`La habitación ${element} ya existe`);
      setSelectedElement(null);
      return;
    }

    setError(null);
    setSelectedElement(element);
    const option = elementOptions.find(opt => opt.value === element);
    if (option) {
      setToast(option.description);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleAddRoom = async () => {
    if (!selectedElement) return;

    try {
      // Double check to prevent duplicates
      const elementExists = rooms.some(room => room.element === selectedElement);
      if (elementExists) {
        setError(`La habitación ${selectedElement} ya existe`);
        setSelectedElement(null);
        return;
      }

      await addRoom({
        element: selectedElement,
        currentZone: selectedZone,
        users: []
      });
      await loadRooms();
      setSelectedElement(null);
      setSelectedZone('Libre');
      setError(null);
    } catch (error) {
      console.error('Error adding room:', error);
      setError('Error al añadir la habitación');
    }
  };

  const handleEdit = (room: Room) => {
    setEditingId(room.id);
    setEditForm(room);
    setError(null);
  };

  const handleSave = async () => {
    if (!editingId || !editForm.element) return;

    try {
      // Check if the new element already exists in other rooms
      const elementExists = rooms.some(room => 
        room.id !== editingId && room.element === editForm.element
      );
      if (elementExists) {
        setError(`La habitación ${editForm.element} ya existe`);
        return;
      }

      await updateRoom(editingId, editForm);
      setEditingId(null);
      setEditForm({});
      setError(null);
      await loadRooms();
    } catch (error) {
      console.error('Error updating room:', error);
      setError('Error al actualizar la habitación');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id);
      await loadRooms();
      setError(null);
    } catch (error) {
      console.error('Error deleting room:', error);
      setError('Error al eliminar la habitación');
    }
  };

  // Get available elements (not used in existing rooms)
  const availableElements = elementOptions.filter(option => 
    !rooms.some(room => room.element === option.value)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Gestión de Habitaciones
        </h2>
        <span className="text-gray-400 text-sm">
          {rooms.length} de 20 habitaciones configuradas
        </span>
      </div>

      {error && (
        <div className="p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Add Room Form */}
      <div className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Añadir Nueva Habitación
        </h3>
        
        <div className="space-y-4">
          <ElementSelector
            options={availableElements}
            selectedElement={selectedElement}
            onSelect={handleElementSelect}
          />

          <div className="flex gap-4">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value as Zone)}
              className="rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {zones.map(zone => (
                <option key={zone} value={zone}>
                  {zone === 'Libre' ? '🌟 Libre (Descanso)' : zone}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddRoom}
              disabled={!selectedElement || rooms.length >= 20}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Añadir Habitación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="space-y-4">
        {rooms.map((room) => {
          const element = elementOptions.find(opt => opt.value === room.element);
          const Icon = element?.icon;
          
          return (
            <div
              key={room.id}
              className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6"
            >
              {editingId === room.id ? (
                <div className="space-y-4">
                  <ElementSelector
                    options={[
                      ...elementOptions.filter(opt => opt.value === room.element),
                      ...availableElements
                    ]}
                    selectedElement={editForm.element || null}
                    onSelect={(element) => setEditForm({ ...editForm, element })}
                  />

                  <div className="flex gap-4">
                    <select
                      value={editForm.currentZone}
                      onChange={(e) => setEditForm({ ...editForm, currentZone: e.target.value as Zone })}
                      className="rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {zones.map(zone => (
                        <option key={zone} value={zone}>
                          {zone === 'Libre' ? '🌟 Libre (Descanso)' : zone}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSave}
                      className="text-green-400 hover:text-green-300 p-2"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditForm({});
                        setError(null);
                      }}
                      className="text-gray-400 hover:text-gray-300 p-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {Icon && (
                      <div className={`p-3 rounded-lg bg-gradient-to-b ${element.gradient}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {room.element}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {room.currentZone === 'Libre' ? (
                          <span className="text-yellow-400">🌟 Libre (Descanso)</span>
                        ) : (
                          <span>Zona asignada: {room.currentZone}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(room)}
                      className="text-blue-400 hover:text-blue-300 p-2"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Toast message={toast} />
    </div>
  );
};

export default RoomManagement;