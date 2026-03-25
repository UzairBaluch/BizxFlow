/**
 * Normalizes metadata so UIs can deep-link with common aliases (snake_case,
 * alternate names) without breaking existing `taskId` / `leaveId` keys.
 */
export function enrichNotificationMetadata(meta = {}) {
  if (!meta || typeof meta !== "object") {
    return {};
  }
  const m = { ...meta };

  if (m.leaveId != null && m.leaveId !== "") {
    const id = String(m.leaveId);
    m.leaveRequestId = m.leaveRequestId ?? id;
    m.requestId = m.requestId ?? id;
    m.leave_id = m.leave_id ?? id;
  }

  if (m.taskId != null && m.taskId !== "") {
    const id = String(m.taskId);
    m.task_id = m.task_id ?? id;
  }

  if (m.announcementId != null && m.announcementId !== "") {
    const id = String(m.announcementId);
    m.announcement_id = m.announcement_id ?? id;
  }

  if (m.attendanceId != null && m.attendanceId !== "") {
    const id = String(m.attendanceId);
    m.attendanceRecordId = m.attendanceRecordId ?? id;
    m.recordId = m.recordId ?? id;
  }

  if (m.employeeId != null && m.employeeId !== "") {
    const id = String(m.employeeId);
    m.userId = m.userId ?? id;
  }

  if (m.assignedTo != null && m.assignedTo !== "") {
    const id = String(m.assignedTo);
    m.assigneeId = m.assigneeId ?? id;
  }

  if (m.updatedBy != null && m.updatedBy !== "") {
    m.updated_by = m.updated_by ?? String(m.updatedBy);
  }

  return m;
}
