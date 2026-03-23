class CourseModel {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    await this.db.read();
    return this.db.data.courses || [];
  }

  async findById(id) {
    await this.db.read();
    return (this.db.data.courses || []).find(course => course.id === id);
  }

  async create(courseData) {
    await this.db.read();
    const course = {
      id: require('uuid').v4(),
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.db.data.courses = this.db.data.courses || [];
    this.db.data.courses.push(course);
    await this.db.write();
    return course;
  }

  async update(id, updates) {
    await this.db.read();
    const index = (this.db.data.courses || []).findIndex(c => c.id === id);
    if (index === -1) return null;
    
    const updatedCourse = {
      ...this.db.data.courses[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.db.data.courses[index] = updatedCourse;
    await this.db.write();
    return updatedCourse;
  }

  async delete(id) {
    await this.db.read();
    const initialLength = (this.db.data.courses || []).length;
    this.db.data.courses = (this.db.data.courses || []).filter(c => c.id !== id);
    
    if (this.db.data.courses.length < initialLength) {
      await this.db.write();
      return true;
    }
    return false;
  }
}

module.exports = CourseModel;
