/**
 * Mock Student API Service.
 * Provides simulated asynchronous operations with realistic latency and validation.
 * NOTE: Operates on in-memory/browser-stored data. Does not talk to a backend server.
 */

import { INITIAL_STUDENTS } from '../data/seedData';
import { loadPersistedState } from '../utils/storage';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockStudentApi = {
  /**
   * Fetches the initial student list asynchronously.
   * @returns {Promise<Array>}
   */
  async fetchStudents() {
    await delay(250);
    const persisted = loadPersistedState();
    if (persisted?.students?.ids && persisted?.students?.entities) {
      return Object.values(persisted.students.entities);
    }
    return [...INITIAL_STUDENTS];
  },

  /**
   * Simulates adding a new student.
   * @param {Object} studentData
   * @returns {Promise<Object>}
   */
  async createStudent(studentData) {
    await delay(300);

    if (!studentData.studentId?.trim()) {
      throw new Error('Student ID is required.');
    }
    if (!studentData.name?.trim()) {
      throw new Error('Student name is required.');
    }
    if (!studentData.department?.trim()) {
      throw new Error('Department is required.');
    }
    if (!studentData.email?.trim()) {
      throw new Error('Email is required.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentData.email.trim())) {
      throw new Error('Invalid email address format.');
    }

    const newStudent = {
      ...studentData,
      id: studentData.id || `stu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId: studentData.studentId.trim().toUpperCase(),
      name: studentData.name.trim(),
      email: studentData.email.trim().toLowerCase(),
      status: studentData.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return newStudent;
  },

  /**
   * Simulates updating an existing student.
   * @param {Object} studentData
   * @returns {Promise<Object>}
   */
  async updateStudent(studentData) {
    await delay(250);

    if (!studentData.id) {
      throw new Error('Internal student ID missing for update.');
    }
    if (!studentData.name?.trim()) {
      throw new Error('Student name is required.');
    }
    if (!studentData.email?.trim()) {
      throw new Error('Email is required.');
    }

    return {
      ...studentData,
      name: studentData.name.trim(),
      email: studentData.email.trim().toLowerCase(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Simulates deleting or deactivating a student.
   * @param {string} studentId
   * @returns {Promise<string>}
   */
  async deleteStudent(studentId) {
    await delay(200);
    if (!studentId) throw new Error('Student ID required.');
    return studentId;
  },
};

