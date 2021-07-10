export type INotification = {
    type: NotificationType,
    set: NotificationSet,
    receiversIds: [String],
    message: String,
    title?: String,
}

enum NotificationSet {
    Group = "Group",
    Personalized = "Personalized",
}

export enum NotificationType {
    Email = "Email",
    SMS = "SMS",
    Push = "Push"
}